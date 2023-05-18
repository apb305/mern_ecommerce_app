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

module.exports = router;
