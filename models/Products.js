const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  img: {
    type: String,
    required: [true, "Please add image"],
  },
  priceID: {
    type: String,
    required: [true, "Please add product price ID"],
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
  }
});

module.exports = mongoose.model( "products", productsSchema);