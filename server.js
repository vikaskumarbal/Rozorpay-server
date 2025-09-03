const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Home
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my Razorpay demo server 🚀</h1>");
});

// Contact Us page
app.get("/contact", (req, res) => {
  res.send("<h1>Contact Us</h1><p>Email: support@myshop.com</p>");
});

// Shipping Policy page
app.get("/shipping", (req, res) => {
  res.send("<h1>Shipping Policy</h1><p>Orders are delivered in 5–7 working days.</p>");
});

// Terms & Conditions page
app.get("/terms", (req, res) => {
  res.send("<h1>Terms and Conditions</h1><p>By using this website you agree to our policies.</p>");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});