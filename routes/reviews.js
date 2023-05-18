const express = require("express");
const router = express.Router();
const { getReviews, addReview } = require("../controllers/reviewsController");
const { ensureAuthenticated } = require("../middleware/auth");

router.route("/:id").post(getReviews);
router.route("/").post(ensureAuthenticated, addReview);

module.exports = router;
