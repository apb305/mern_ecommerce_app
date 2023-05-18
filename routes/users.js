const express = require("express");
const router = express.Router();
const { getUser, updateUser } = require("../controllers/usersController");
require("../models/Users");
const { ensureAuthenticated } = require("../middleware/auth");

router
  .route("/")
  .post(ensureAuthenticated, getUser).put(ensureAuthenticated, updateUser)
router

module.exports = router;
