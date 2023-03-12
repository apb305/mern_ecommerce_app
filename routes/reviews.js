const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Reviews");
require("../models/Products");
const Reviews = mongoose.model("reviews");
const Product = mongoose.model("products");
const { ensureAuthenticated } = require("../middleware/auth");
// const { cloudinary } = require("../config/cloudinary");

router.post("/:id", async (req, res) => {
  const productId = mongoose.Types.ObjectId(req.params.id);
  try {
    const reviews = await Reviews.find({ product: productId }).populate(
      "product"
    );
    const product = await Product.findById(productId);
    if(reviews && product) {
      res.status(200).json({ reviews: reviews, product: product });
    }
   
  } catch (error) {
    res.status(500).json("An error has occured");
  }
});

router.post("/", ensureAuthenticated, async (req, res) => {
  const { productId, user, title, rating, body } = req.body.data;
  try {
    const newReview = new Reviews({
      product: productId,
      user: user,
      rating: rating,
      title: title,
      body: body,
    });
    await newReview.save();
    const reviews = await Reviews.find({ product: productId }).populate(
      "product"
    );
    const reviewedProduct = await Product.findById(productId);
    res.status(200).json({ reviews: reviews, product: reviewedProduct });
  } catch (error) {
    res.status(500).json("An error has occured");
  }
});

// router.put("/", ensureAuthenticated, async (req, res) => {
//   try {
//     await Review.updateOne(
//       { uid: req.body.uid },
//       { $addToSet: { wishlist: req.body.data } }
//     );
//     const user = Review.findOne({ uid: req.body.uid });
//     res.status(200).json(user.wishlist);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.delete("/", ensureAuthenticated, async (req, res) => {
//   try {
//     await Review.updateOne(
//       { uid: req.body.uid },
//       { $pull: { wishlist: { _id: req.body._id } } }
//     );
//     const user = Review.findOne({ uid: req.body.uid });
//     res.status(200).json(user.wishlist);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
