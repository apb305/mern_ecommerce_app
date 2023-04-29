const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    customerId: {
      type: String,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "products",
        },
        productName: {
          type: String,
          required: true,
        },
        img: {
          type: String,
          required: true,
        },
        productDescription: {
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
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    date_added: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model("order", OrderSchema);
