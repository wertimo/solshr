require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

// Check if Stripe secret key is available
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
  console.error('Please check your .env file or environment variables');
  process.exit(1);
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PORT || 4242;

// Log configuration
console.log('🔧 Server Configuration:');
console.log(`   Port: ${port}`);
console.log(`   Stripe Key: ${process.env.STRIPE_SECRET_KEY ? '✅ Loaded' : '❌ Missing'}`);
console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from root directory
app.use(express.static(__dirname));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create a Checkout Session (for redirect flow)
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Received checkout session request:', req.body);
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount provided' });
    }

    console.log(`Creating checkout session for amount: €${amount}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'SOLSHR Investment',
              description: 'Solar energy community investment',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/payment-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/testing-copy.html`,
    });

    console.log(`✅ Checkout session created: ${session.id}`);

    res.json({
      id: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('❌ Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a Payment Intent (for embedded flow)
app.post('/createPaymentIntent', async (req, res) => {
  try {
    const { amount, currency = 'eur' } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount provided' });
    }

    console.log(`Creating payment intent for amount: €${amount}`);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      automatic_payment_methods: { enabled: true }
    });
    
    console.log(`✅ Payment intent created: ${paymentIntent.id}`);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('❌ Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Join waitlist deck endpoint
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

// Catch-all route for SPA (fallback to index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🔗 Health check available at http://localhost:${port}/health`);
  console.log(`💳 Stripe integration ready`);
  console.log(`📁 Serving static files from: ${__dirname}`);
});