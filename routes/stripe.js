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
      billing_address_collection: 'required',
      shipping_options: [
        {shipping_rate: 'shr_1McHupEacISszt8dhGiguzgc'},
        {shipping_rate: 'shr_1McI0WEacISszt8dEObQBwpo'}
      ],
      // automatic_tax: {
      //   enabled: true
      // },
      success_url: `${process.env.HOST_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.HOST_URL}/cart`,
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

// router.post("/order", async (req, res) =>{
//   const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
//   const customer = await stripe.customers.retrieve(session.customer);
//   res.status(200).json(customer)
// })

module.exports = router;