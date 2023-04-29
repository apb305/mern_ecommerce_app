const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
require("../models/Order");
const Order = mongoose.model("order");

const createPayment = asyncHandler(async (req, res) => {
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
      billing_address_collection: "required",
      shipping_options: [
        { shipping_rate: "shr_1McHupEacISszt8dhGiguzgc" },
        { shipping_rate: "shr_1McI0WEacISszt8dEObQBwpo" },
      ],
      // automatic_tax: {
      //   enabled: true
      // },
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

//Fulfull the order
const fulfillOrder = (customer, lineItems) => {
  // TODO: fill me in

  const newOrder = new Order({
    
  });

  console.log(lineItems);
  console.log(customer);
};

//Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//Stripe Webhook
const stripeWebhook = asyncHandler(async (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  try {
    if (event.type === "checkout.session.completed") {

      // Extract the checkout object itself from the event
      const data = event.data.object;

      //Get customer
      const customer = await stripe.customers.retrieve(data.customer);

      //Get line items
      const items = await new Promise((resolve, reject) => {
        stripe.checkout.sessions.listLineItems(
          data.id,
          { limit: 100 },
          (err, lineItems) => {
            if (err) {
              return reject(err);
            }
            resolve(lineItems);
          }
        );
      });

      // Fulfill the purchase...
      fulfillOrder(customer, items);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  createPayment,
  checkoutSuccess,
  stripeWebhook,
};
