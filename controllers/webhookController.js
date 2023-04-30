const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
require("../models/Order");
const Order = mongoose.model("order");

//Fulfull the order
const fulfillOrder = async (customer, items, data) => {
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      productId: item.id,
      productName: item.description,
      price: item.amount_total,
      quantity: item.quantity,
    });
  });

  const newOrder = new Order({
    customerEmail: customer.email,
    orderId: customer.invoice_prefix,
    items: lineItems,
    total: data.amount_total,
    shippingAddress: {
      address: customer.address.line1,
      addressTwo: customer.address.line2,
      city: customer.address.city,
      postalCode: customer.address.postal_code,
      country: customer.address.country,
    },
  });

  await newOrder.save();
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

      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        }
      );

      const items = session.line_items.data;

      // Return a 200 response to acknowledge receipt of the event
      response.status(200).json({ items: items, customer: customer });
      // Fulfill the purchase...
      fulfillOrder(customer, items, data);
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = {
  stripeWebhook,
};
