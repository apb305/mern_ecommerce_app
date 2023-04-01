const mongoose = require("mongoose");
require("../models/Reviews");
require("../models/Products");
const Reviews = mongoose.model("reviews");
const Product = mongoose.model("products");
const asyncHandler = require("express-async-handler");


const getReviews = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }
  const reviews = await Reviews.find({ product: req.params.id }).populate(
    "product"
  );
  const product = await Product.findById(req.params.id);
  if (!product && !reviews) {
    return res.status(400).json({ msg: "Product not found" });
  }
  res.status(200).json({ reviews, product });
});

const addReview = asyncHandler(async (req, res) => {
  const { productId, user, userId, title, rating, body } = req.body.data;
  const product = await Product.findById(productId);
  if (product) {
    const productReview = new Reviews({
      product: productId,
      user: user,
      uid: userId,
      rating: rating,
      title: title,
      body: body,
    });
    await productReview.save();
    const reviews = await Reviews.find({ product: productId }).populate(
      "product"
    );
    res.status(200).json({ reviews, product });
  } else {
    return res.status(400).json({ msg: "Product not found" });
  }
});

module.exports = {
  getReviews,
  addReview,
};
