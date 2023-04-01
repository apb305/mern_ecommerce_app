const express = require("express");
const router = express.Router();
const {
  getWishlistItems,
  addToWishlist,
  deleteWishlistItem,
} = require("../controllers/wishlistController");
const { ensureAuthenticated } = require("../middleware/auth");

router
  .route("/")
  .post(ensureAuthenticated, getWishlistItems)
  .delete(ensureAuthenticated, deleteWishlistItem);

  router
  .route("/addWishlist")
  .post(ensureAuthenticated, addToWishlist)

// router.post("/", ensureAuthenticated, async (req, res) => {
//   try {
//     const user = await User.findOne({ uid: req.body.uid });
//     res.status(200).json(user.wishlist);
//   } catch (error) {
//     console.log(error.message)
//    res.status(500).send("An error has occured")
//   }
// });

// router.put("/", ensureAuthenticated, async (req, res) => {
//   try {
//    await User.updateOne(
//       { uid: req.body.uid },
//       { $addToSet: { wishlist: req.body.data } }
//     );
//     const user = User.findOne({ uid: req.body.uid });
//     res.status(200).json(user.wishlist);
//   } catch (error) {
//     console.log(error.message)
//    res.status(500).send("An error has occured")
//   }
// });

// router.delete("/", ensureAuthenticated, async (req, res) => {
//   try {
//    await User.updateOne(
//       { uid: req.body.uid },
//       { $pull: { wishlist: { _id: req.body._id } } }
//     );
//     const user = User.findOne({ uid: req.body.uid });
//     res.status(200).json(user.wishlist);
//   } catch (error) {
//     console.log(error.message)
//    res.status(500).send("An error has occured")
//   }
// });

module.exports = router;
