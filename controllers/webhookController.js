const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
require("../models/Order");
const Order = mongoose.model("order");

//Fulfull the order
const fulfillOrder = (customer, lineItems) => {
  const newOrder = new Order({});

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

      // Return a 200 response to acknowledge receipt of the event
      response.json({
        customer: customer,
        items: items,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  stripeWebhook,
};
