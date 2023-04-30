const express = require("express");
const {
  stripeWebhook
} = require("../controllers/webhookController");
const router = express.Router();

router.route("/").post(express.raw({ type: 'application/json' }), stripeWebhook)

module.exports = router;