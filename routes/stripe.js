const express = require("express");
const router = express.Router();
require("../models/Users");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.post("/", async (req, res) => {
  const items = req.body.data;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.priceID,
      quantity: item.quantity,
    });
  });

  try {
    // Create a PaymentIntent with the order amount and currency 
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      success_url:  `${process.env.SUCCESS_URL}/success.html`,
      cancel_url: `${process.env.CANCEL_URL}/cart`,
    });
    res.send(
      JSON.stringify({
        url: session.url,
      })
    );
  } catch (err) {
    return res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

module.exports = router;