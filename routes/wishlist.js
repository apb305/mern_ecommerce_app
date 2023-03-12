const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Users");
const User = mongoose.model("users");
const { ensureAuthenticated } = require("../middleware/auth");
// const { cloudinary } = require("../config/cloudinary");

router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.body.uid });
    res.status(200).json(user.wishlist);
  } catch (error) {
   res.status(500).json("An error has occured")
  }
});

router.put("/", ensureAuthenticated, async (req, res) => {
  try {
   await User.updateOne(
      { uid: req.body.uid },
      { $addToSet: { wishlist: req.body.data } }
    );
    const user = User.findOne({ uid: req.body.uid });
    res.status(200).json(user.wishlist);
  } catch (error) {
   res.status(500).json("An error has occured")
  }
});

router.delete("/", ensureAuthenticated, async (req, res) => {
  try {
   await User.updateOne(
      { uid: req.body.uid },
      { $pull: { wishlist: { _id: req.body._id } } }
    );
    const user = User.findOne({ uid: req.body.uid });
    res.status(200).json(user.wishlist);
  } catch (error) {
   res.status(500).json("An error has occured")
  }
});

module.exports = router;
