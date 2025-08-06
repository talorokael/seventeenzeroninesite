// src/utils/paystack.js
// Utility for Paystack payment integration (test and production ready)
// Usage: import { payWithPaystack } from "../utils/paystack";

export function payWithPaystack({ email, amount, metadata, onSuccess, onClose, publicKey, currency = "USD" }) {
  if (!window.PaystackPop) {
    alert("Paystack script not loaded.");
    return;
  }
  const handler = window.PaystackPop.setup({
    key: publicKey,
    email,
    amount: Math.round(amount * 100), // Paystack expects amount in kobo/cents
    currency,
    ref: '' + Math.floor(Math.random() * 1000000000 + 1),
    metadata,
    callback: onSuccess,
    onClose,
  });
  handler.openIframe();
}

// ---
// For production:
// 1. Store your public key in an environment variable (e.g. REACT_APP_PAYSTACK_PUBLIC_KEY)
// 2. On payment success, send the response.reference to your backend for verification
// 3. Only fulfill the order after backend verification
// Never expose your secret key in frontend code!
