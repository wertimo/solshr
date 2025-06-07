const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

// Initialize Stripe with proper error handling
let stripe;
try {
    const stripeConfig = functions.config().stripe;
    if (!stripeConfig || !stripeConfig.secret_key) {
        throw new Error('Stripe secret key not found in Firebase Functions configuration');
    }
    stripe = require('stripe')(stripeConfig.secret_key);
} catch (error) {
    console.error('Error initializing Stripe:', error);
    throw error;
}

const cors = require('cors')({origin: true});

admin.initializeApp();

// HubSpot API configuration
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3';

// Function to create/update contact in HubSpot
async function syncContactWithHubSpot(contactData) {
    try {
        const { email, name, comment } = contactData;
        
        // Prepare contact data for HubSpot
        const hubspotContact = {
            properties: {
                email: email,
                firstname: name.split(' ')[0],
                lastname: name.split(' ').slice(1).join(' ') || '',
                comments: comment || '',
                source: 'SOLSHR Website',
                createdate: new Date().toISOString()
            }
        };

        // Check if contact exists in HubSpot
        const searchResponse = await axios.get(`${HUBSPOT_API_URL}/objects/contacts/search`, {
            headers: {
                'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: {
                filterGroups: [{
                    filters: [{
                        propertyName: 'email',
                        operator: 'EQ',
                        value: email
                    }]
                }]
            }
        });

        let contactId;
        if (searchResponse.data.total > 0) {
            // Update existing contact
            contactId = searchResponse.data.results[0].id;
            await axios.patch(
                `${HUBSPOT_API_URL}/objects/contacts/${contactId}`,
                hubspotContact,
                {
                    headers: {
                        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        } else {
            // Create new contact
            const createResponse = await axios.post(
                `${HUBSPOT_API_URL}/objects/contacts`,
                hubspotContact,
                {
                    headers: {
                        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            contactId = createResponse.data.id;
        }

        return contactId;
    } catch (error) {
        console.error('Error syncing with HubSpot:', error);
        throw error;
    }
}

// Cloud Function to listen for new responses
exports.syncWithHubSpot = functions.database
    .ref('/responses/{responseId}')
    .onCreate(async (snapshot, context) => {
        try {
            const responseData = snapshot.val();
            const contactId = await syncContactWithHubSpot(responseData);
            
            // Update Firebase record with HubSpot contact ID
            await snapshot.ref.update({
                hubspotContactId: contactId,
                syncedAt: admin.database.ServerValue.TIMESTAMP
            });

            return null;
        } catch (error) {
            console.error('Error in syncWithHubSpot function:', error);
            throw error;
        }
    });

// Create a payment intent
exports.createPaymentIntent = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        try {
            const { amount, currency = 'eur' } = req.body;

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100, // Convert to cents
                currency: currency,
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            console.error('Error creating payment intent:', error);
            res.status(500).json({ error: error.message });
        }
    });
});

// Handle successful payment
exports.handleSuccessfulPayment = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        try {
            const { paymentIntentId, userId, amount } = req.body;

            // Verify the payment with Stripe
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            
            if (paymentIntent.status !== 'succeeded') {
                throw new Error('Payment not successful');
            }

            // Store payment information in Firebase
            const paymentRef = admin.database().ref('payments').push();
            await paymentRef.set({
                paymentIntentId,
                userId,
                amount,
                status: 'completed',
                timestamp: admin.database.ServerValue.TIMESTAMP
            });

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error handling payment:', error);
            res.status(500).json({ error: error.message });
        }
    });
});

// Webhook to handle Stripe events
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Handle successful payment
            await handlePaymentSuccess(paymentIntent);
            break;
        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            // Handle failed payment
            await handlePaymentFailure(failedPayment);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

async function handlePaymentSuccess(paymentIntent) {
    try {
        // Store successful payment in database
        const paymentRef = admin.database().ref('payments').push();
        await paymentRef.set({
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount / 100, // Convert from cents
            status: 'completed',
            timestamp: admin.database.ServerValue.TIMESTAMP
        });

        // You can add additional logic here, such as:
        // - Updating user credits
        // - Sending confirmation emails
        // - Syncing with HubSpot
    } catch (error) {
        console.error('Error handling successful payment:', error);
    }
}

async function handlePaymentFailure(paymentIntent) {
    try {
        // Store failed payment in database
        const paymentRef = admin.database().ref('payments').push();
        await paymentRef.set({
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            status: 'failed',
            error: paymentIntent.last_payment_error?.message,
            timestamp: admin.database.ServerValue.TIMESTAMP
        });

        // You can add additional logic here, such as:
        // - Notifying the user
        // - Logging the failure
    } catch (error) {
        console.error('Error handling failed payment:', error);
    }
} 