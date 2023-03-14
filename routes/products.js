const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Products");
require("../models/Reviews");
const Product = mongoose.model("products");
const Reviews = mongoose.model("reviews");
const Products = mongoose.model("products");

router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).send("An error has occured")
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({msg: "Invalid product ID"})
    }
    const product = await Product.findById(req.params.id);
    const reviews = await Reviews.find({"product": req.params.id}).populate("product");
    if (!product && !reviews) {
      return res.status(400).json({msg: "Product not found"})
    }
    res.status(200).json({product: product, reviews: reviews});
  } catch (error) {
    console.log(error.message)
    res.status(500).send("An error has occured")
  }
});


module.exports = router;
