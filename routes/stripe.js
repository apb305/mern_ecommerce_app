const express = require("express");
const {
  createPayment,
  checkoutSuccess,
  stripeWebhook
} = require("../controllers/stripeController");
const router = express.Router();

router.route("/").post(createPayment);
router.route("/success").post(checkoutSuccess);
router.route("/webhook").post(express.raw({type: '*/*'}), stripeWebhook)

module.exports = router;
