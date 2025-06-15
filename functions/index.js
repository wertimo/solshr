// Import the new modular SDKs
const { onRequest } = require('firebase-functions/v2/https');
const { onValueCreated } = require('firebase-functions/v2/database');
const { setGlobalOptions } = require('firebase-functions/v2');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getDatabase, ServerValue } = require('firebase-admin/database');
const axios = require('axios');
const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Set global options (region, etc.)
setGlobalOptions({ region: 'europe-west1' });

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Stripe
const stripeSecret = process.env.STRIPE_SECRET_KEY || functions.config().stripe.secret_key;
if (!stripeSecret) {
  throw new Error('Stripe secret key not found in environment variables or Firebase config');
}
const stripe = require('stripe')(stripeSecret);

// HubSpot API configuration
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3';

// Sync contacts with HubSpot
exports.syncWithHubSpot = functions
  .region('europe-west1')
  .database
  .ref('/responses/{responseId}')
  .onCreate(async (snapshot, context) => {
    try {
      const responseData = snapshot.val();
      const responseId = context.params.responseId;

      // Create contact in HubSpot
      const contact = {
        properties: {
          email: responseData.email,
          firstname: responseData.name,
          lastname: '',
          phone: '',
          company: 'SOLSHR',
          website: '',
          lifecyclestage: 'lead',
          hubspot_owner_id: '123456789', // Replace with your HubSpot owner ID
          notes: responseData.comment || 'No comment provided'
        }
      };

      const response = await axios.post(
        `https://api.hubapi.com/crm/v3/objects/contacts`,
        contact,
        {
          headers: {
            'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update Firebase with HubSpot contact ID
      await snapshot.ref.update({
        hubspotContactId: response.data.id,
        syncedAt: admin.database.ServerValue.TIMESTAMP
      });

      return { success: true, contactId: response.data.id };
    } catch (error) {
      console.error('Error syncing with HubSpot:', error);
      throw new functions.https.HttpsError('internal', 'Failed to sync with HubSpot');
    }
  });

// Create Payment Intent
exports.createPaymentIntent = functions
  .region('europe-west1')
  .https
  .onRequest((req, res) => {
    return cors(req, res, async () => {
      try {
        const { amount, currency = 'eur' } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
          automatic_payment_methods: {
            enabled: true,
          },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: error.message });
      }
    });
  });

// Handle successful payment
exports.handleSuccessfulPayment = functions
  .region('europe-west1')
  .https
  .onRequest((req, res) => {
    return cors(req, res, async () => {
      try {
        const { paymentIntentId, userId } = req.body;

        // Update user's payment status in Firebase
        await admin.database().ref(`/users/${userId}/payments`).push({
          paymentIntentId,
          status: 'completed',
          timestamp: admin.database.ServerValue.TIMESTAMP
        });

        res.json({ success: true });
      } catch (error) {
        console.error('Error handling successful payment:', error);
        res.status(500).json({ error: error.message });
      }
    });
  });

// Stripe webhook handler
exports.stripeWebhook = functions
  .region('europe-west1')
  .https
  .onRequest((req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || functions.config().stripe.webhook_secret
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!');
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log('PaymentMethod was attached to a Customer!');
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }); 