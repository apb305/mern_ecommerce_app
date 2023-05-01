const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    customerEmail: {
      type: String,
      required: true
    },
    // orderId: {
    //   type: String,
    //   required: true
    // },
    items: [
      {
        // productId: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   required: true,
        //   ref: "products",
        // },
        productId: {
          type: String,
          required: true
        },
        productName: {
          type: String,
          required: true,
        },
        productPrice: {
          type: String,
          requured: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity can not be less then 1."],
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      address: { type: String, required: true },
      addressTwo: {type: String},
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model("order", OrderSchema);
