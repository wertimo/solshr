// This test secret API key is a placeholder. Don't include personal details in requests with this key.
// To see your test secret API key embedded in code samples, sign in to your Stripe account.
// You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
const stripe = Stripe("pk_test_51RXO5KQNTCHBUv7x4GItVpIVHol6b3McyerrlJaYJOt86gwK5F4m9nLl5Du7B7izHqIDvDyejktMkBkOC4XDKqOz00Ao8Z89OC");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}