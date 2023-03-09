const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Products");
require("../models/Reviews");
const Product = mongoose.model("products");
const Reviews = mongoose.model("reviews");
// const { cloudinary } = require("../config/cloudinary");

router.post("/:id", async (req, res) => {
  const productId = mongoose.Types.ObjectId(req.params.id);
  try {
    const product = await Product.findById(productId);
    const reviews = await Reviews.find({"product": productId}).populate("product");
    res.status(200).json({product: product, reviews: reviews});
  } catch (error) {
    res.status(400).json("An error has occured")
    console.log(error);
  }
});

module.exports = router;
