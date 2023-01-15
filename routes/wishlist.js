const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Users");
const User = mongoose.model("users");
const { ensureAuthenticated } = require("../middleware/auth");
// const { cloudinary } = require("../config/cloudinary");


// router.post("/", ensureAuthenticated, async (req, res) => {
//   try {
//     const user = await User.findOne({ uid: req.body.id });
//     if (user) {
//       res.status(200).json(user.wishlist);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    await User.updateOne(
      { uid: req.body.uid },
      { $addToSet: { wishlist: req.body.data } }
    );
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
  }
});


router.delete("/", ensureAuthenticated, async (req, res) => {
  try {
    await User.updateOne(
      { uid: req.body.uid },
      { $pull: { wishlist: { _id: req.body._id } } }
    );
    res.status(200).json("Success");
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
