const express = require("express");
const {
  createPayment,
  checkoutSuccess,
  stripeWebhook
} = require("../controllers/stripeController");
const router = express.Router();

router.route("/checkout").post(createPayment);
router.route("/success").post(checkoutSuccess);
router.route("/webhook").post(express.raw({type: 'application/json'}), stripeWebhook)

module.exports = router;
