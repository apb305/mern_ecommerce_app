const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Reviews");
const Reviews = mongoose.model("reviews");
const { ensureAuthenticated } = require("../middleware/auth");
// const { cloudinary } = require("../config/cloudinary");

router.get("/:id", async (req, res) => {
  const productId = mongoose.Types.ObjectId(req.params.id);
  try {
    const reviews = await Reviews.find({"product": productId}).populate("product");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json("An error has occured")
    console.log(error);
  }
});

router.post("/", ensureAuthenticated, async (req, res) => {
  const { product, user, title, rating, body } = req.body.data;
  try {
    const newReview = new Reviews({
      product: product,
      user: user,
      rating: rating,
      title: title,
      body: body,
    });
    await newReview.save();
    const reviews = await Reviews.find({"product": product}).populate("product");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json("An error has occured")
    console.log(error);
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
