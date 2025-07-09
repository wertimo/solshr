const functions = require('@google-cloud/functions-framework');

/**
 * Handles CORS preflight and actual requests.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
const cors = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://solshr.com');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');

  if (req.method === 'OPTIONS') {
    // Stops the request from continuing to the function code
    res.status(204).send('');
  } else {
    // Allows the request to continue to the function code
    next();
  }
};

/**
 * HTTP Cloud Function to process waitlist form submissions and serve PDF.
 */
functions.http('joinWaitlistDeck', (req, res) => {
  // Wrap the function logic in the CORS middleware
  cors(req, res, () => {
    if (req.method === 'GET') {
      // Serve the PDF file
      const pdfUrl = 'https://storage.googleapis.com/solshr-pitch-deck/solshr-pitch-deck.pdf';
      
      // Set proper headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="solshr-pitch-deck.pdf"');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      // Redirect to the PDF file
      res.redirect(pdfUrl);
      return;
    }

    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    try {
      const { name, email, comment, termsAccepted } = req.body;

      if (!name || !email || !termsAccepted) {
        return res.status(400).send('Missing required fields: name, email, and terms acceptance are required.');
      }

      // Log the data (in a real app, you would save this to a database like Firestore)
      console.log('New deck download request received:');
      console.log(`  Name: ${name}`);
      console.log(`  Email: ${email}`);
      console.log(`  Comment: ${comment || 'No comment provided.'}`);
      console.log(`  Terms Accepted: ${termsAccepted}`);
      
      // Return success response with PDF URL
      res.status(200).json({ 
        message: "Successfully processed request.",
        pdfUrl: "https://europe-west1-928758805701.cloudfunctions.net/joinWaitlistDeck?download=true"
      });

    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).send('An internal server error occurred.');
    }
  });
}); 