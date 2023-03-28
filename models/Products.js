const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    // admin: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "users",
    // },
    img: {
      type: String,
      required: [true, "Please add image"],
    },
    priceID: {
      type: String,
      required: [true, "Please add product price ID"],
    },
    category: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: [true, "Please add product description"],
    },
    productName: {
      type: String,
      required: [true, "Please add product name"],
    },
    productPrice: {
      type: String,
      required: [true, "Please add product price"],
    },
    productRating: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
