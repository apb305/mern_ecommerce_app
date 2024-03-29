const mongoose = require("mongoose");
const { validateSignup } = require("../validation/validator");
const asyncHandler = require("express-async-handler");
require("../models/Users");
const User = mongoose.model("users");

const signup = asyncHandler(async (req, res) => {
  const { error, value } = validateSignup(req.body);
  if (error) {
    console.log(error);
    return res.send(error.details);
  }
  try {
    const newUser = new User({
      uid: req.body.uid,
      name: req.body.name,
      email: req.body.email,
    });
    await newUser.save();
    res.status(200).send("Success");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("An error has occured");
  }
});

module.exports = {
    signup
}