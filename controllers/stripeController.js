const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
require("../models/Order");
const Order = mongoose.model("order");

const createPayment = asyncHandler(async (req, res) => {

  const { items, id} = req.body;

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
      metadata: {
        userId: id,
      },
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      shipping_options: [
        {tax_behavior: "inclusive"},
        { shipping_rate: "shr_1McHupEacISszt8dhGiguzgc" },
        { shipping_rate: "shr_1McI0WEacISszt8dEObQBwpo" },
      ],
      automatic_tax: {
        enabled: true
      },
      success_url: `${process.env.SUCCESS_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SUCCESS_URL}/cart`,
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

const checkoutSuccess = asyncHandler(async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
  const customer = await stripe.customers.retrieve(session.customer);
  res.status(200).json(customer);
});

module.exports = {
  createPayment,
  checkoutSuccess
};
