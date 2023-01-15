const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Products");
const Products = mongoose.model("products");
// const { cloudinary } = require("../config/cloudinary");

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (product) {
        res.status(200).json(product);
      }
  } catch (error) {
    res.status(400).json("An error has occured")
    console.log(error);
  }
});

module.exports = router;
