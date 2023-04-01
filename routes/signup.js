const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/signupController");
const { ensureAuthenticated } = require("../middleware/auth");

router.route("/").post(ensureAuthenticated, signup);

module.exports = router;
