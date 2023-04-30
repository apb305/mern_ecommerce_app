const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
require("../models/Order");
const Order = mongoose.model("order");

//Fulfull the order
const fulfillOrder = async (customer, items, data) => {
//   console.log(data);

  let lineItems = [];
  items.data.forEach((item) => {
    lineItems.push({
      productId: item.id,
      productName: item.description,
      price: item.amount_total,
      quantity: item.quantity,
    });
  });

  const newOrder = new Order({
    customerEmail: customer.email,
    orderId: data.client_reference_id,
    // orderId: "12345",
    items: lineItems,
    total: data.amount_total,
    shippingAddress: {
      address: customer.address.line1,
      addressTwo: customer.address.line2,
      city: customer.address.city,
      postalCode: customer.address.postal_code,
      country: customer.address.country,
    },
    // shippingAddress: {
    //     address: "1411 La casita st",
    //     addressTwo: null,
    //     city: "Deltona",
    //     postalCode: "32725",
    //     country: "USA"
    // }
  });

  await newOrder.save();

//   console.log(lineItems);
//   console.log(customer);
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

  if (event.type === "checkout.session.completed") {
    // Extract the checkout object itself from the event
    const data = event.data.object;
    try {
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
      fulfillOrder(customer, items, data);
    } catch (error) {
      console.log(error);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.status(200).send();
  }
});

module.exports = {
  stripeWebhook,
};
