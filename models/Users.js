const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, "Please add your name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
  },
  phone: {
    type: String,
  },
  photoURL: {
    type: String,
  },
  photoId: {
    type: String,
  },
  wishlist: {
    type: Array
  }
});

module.exports = mongoose.model("users", userSchema);