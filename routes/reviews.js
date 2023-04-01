const express = require("express");
const router = express.Router();
const { getReviews, addReview } = require("../controllers/reviewsController");
const { ensureAuthenticated } = require("../middleware/auth");

router.route("/:id").post(getReviews);
router.route("/").post(ensureAuthenticated, addReview);

// router.post("/:id", async (req, res) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ msg: "Invalid product ID" });
//   }
//   try {
//     const reviews = await Reviews.find({ product: req.params.id }).populate(
//       "product"
//     );
//     const product = await Product.findById(req.params.id);
//     if (!product && !reviews) {
//       return res.status(400).json({ msg: "Product not found" });
//     }
//     res.status(200).json({ reviews, product });
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).send("An error has occured");
//   }
// });

// router.post("/", ensureAuthenticated, async (req, res) => {
//   const { productId, user, userId, title, rating, body } = req.body.data;
//   try {
//     const productReview = new Reviews({
//       product: productId,
//       user: user,
//       uid: userId,
//       rating: rating,
//       title: title,
//       body: body,
//     });
//     await productReview.save();
//     const reviews = await Reviews.find({ product: productId }).populate(
//       "product"
//     );
//     const product = await Product.findById(productId);
//     res.status(200).json({ reviews, product });
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).send("An error has occured");
//   }
// });

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
