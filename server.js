const express = require('express');
const crypto = require('crypto');

const app = express();

app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
}));

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'test_secret';

// Health check
app.get('/', (req, res) => res.send('Server chal raha hai 🚀'));

// Razorpay webhook route
app.post('/razorpay/webhook', (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const expected = crypto.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
    .update(req.rawBody)
    .digest('hex');

  if (signature !== expected) {
    return res.status(400).send('❌ Invalid signature');
  }

  const event = req.body.event;
  console.log("✅ Event aaya:", event);

  if (event === 'subscription.activated') {
    console.log("Subscription shuru ho gayi");
  } else if (event === 'invoice.paid') {
    console.log("Invoice paid, subscription continue hai");
  } else if (event === 'subscription.cancelled') {
    console.log("Subscription cancel ho gayi");
  }

  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} port pe chal raha hai`));