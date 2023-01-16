const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Users");
const User = mongoose.model("users");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { ensureAuthenticated } = require("../middleware/auth");
// const { cloudinary } = require("../../config/cloudinary");


router.post("/", async (req, res) => {
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.priceID,
                quantity: item.quantity
            }
        )
    });
  
    // const line_items = req.body.items.map((item) => {
    //   return {
    //     price_data: {
    //       currency: "usd",
    //       product_data: {
    //         name: item.productName,
    //         images: item.img,
    //         description: item.productDescription,
    //         metadata: {
    //           id: item.id,
    //         },
    //       },
    //       unit_amount: item.productPrice * 100,
    //     },
    //     quantity: item.quantity,
    //   };
    // });
  
    try {
      // Create a PaymentIntent with the order amount and currency
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        payment_method_types: ["card"],
        success_url: `${"http://localhost:3000/success" || "https://mern-ecommerce-app-client.onrender.com/success"}`,
        cancel_url: `${"http://localhost:3000/cart" || "https://mern-ecommerce-app-client.onrender.com/cart"}`
      });
  
      res.send(JSON.stringify({
        url: session.url
    }));
  
    } catch (err) {
      return res.status(400).send({
        error: {
          message: err.message,
        },
      });
    }
  });

  module.exports = router;