require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4242;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create a Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Received checkout session request:', req.body);
    const {priceID} = await request.json();
    
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${req.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.json({
      id: session.id,
      client_secret: session.client_secret
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a Payment Intent
app.post('/createPaymentIntent', async (req, res) => {
  try {
    const { amount, currency = 'eur' } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      automatic_payment_methods: { enabled: true }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve the PDF with the correct content type
app.get('/deck/solshr-pitch-deck.pdf', (req, res) => {
    const filePath = path.join(__dirname, 'deck', 'solshr-pitch-deck.pdf');
    console.log(`Attempting to serve PDF from: ${filePath}`);

    try {
        const data = fs.readFileSync(filePath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', data.length);
        res.send(data);
        console.log('Successfully sent PDF file.');
    } catch (error) {
        console.error('Error reading or sending PDF file:', error);
        res.status(404).send('File not found');
    }
});

// Serve the PPTX with the correct content type
app.get('/deck/solshr-pitch-deck.pptx', (req, res) => {
    const filePath = path.join(__dirname, 'deck', 'solshr-pitch-deck.pptx');
    try {
        const data = fs.readFileSync(filePath);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
        res.setHeader('Content-Disposition', 'attachment; filename="solshr-pitch-deck.pptx"');
        res.send(data);
        console.log('Successfully sent PPTX file.');
    } catch (error) {
        console.error('Error reading or sending PPTX file:', error);
        res.status(404).send('File not found');
    }
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.post('/join-waitlist-deck', (req, res) => {
    const { name, email, comment, termsAccepted } = req.body;
    console.log('New deck download request:');
    console.log(`  Name: ${name}`);
    console.log(`  Email: ${email}`);
    console.log(`  Comment: ${comment}`);
    console.log(`  Terms Accepted: ${termsAccepted}`);
    
    // Here you could add logic to save to a database
    res.status(200).json({ message: "Successfully processed request." });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Health check available at http://localhost:${port}/health`);
});