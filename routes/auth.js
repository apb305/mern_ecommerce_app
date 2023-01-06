const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Users");
const User = mongoose.model("users");
const { ensureAuthenticated } = require("../middleware/auth");
// const { cloudinary } = require("../config/cloudinary");

router.post("/", async (req, res) => {
  try {
    const newUser = new User({
      uid: req.body.uid,
      name: req.body.name,
      email: req.body.email,
    });
    await newUser.save();
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
