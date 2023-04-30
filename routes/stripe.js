const express = require("express");
const {
  createPayment,
  checkoutSuccess
} = require("../controllers/stripeController");
const router = express.Router();

router.route("/checkout").post(createPayment);
router.route("/success").post(checkoutSuccess);

module.exports = router;
