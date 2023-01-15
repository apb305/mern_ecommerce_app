const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Products");
const Products = mongoose.model("products");
// const { cloudinary } = require("../config/cloudinary");

router.post("/", async (req, res) => {
  try {
    const products = await Products.find();
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(400).json("An error has occured")
    console.log(error);
  }
});

module.exports = router;
