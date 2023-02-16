const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  items: {
    type: Array
  }
});

module.exports = mongoose.model("cart", CartSchema);