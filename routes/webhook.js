const express = require("express");
const {
  stripeWebhook
} = require("../controllers/webhookController");
const router = express.Router();

router.route("/").post(stripeWebhook)

module.exports = router;