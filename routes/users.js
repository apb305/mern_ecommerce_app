const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Users");
const User = mongoose.model("users");
const { ensureAuthenticated } = require("../middleware/auth");
// const { cloudinary } = require("../config/cloudinary");

router.post("/get-user", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.body.uid });
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/search", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.find({ email: req.body.userInvited });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

// router.post("/share-item", ensureAuthenticated, async (req, res) => {
//   try {
//     const invitee = await User.findOne({ _id: req.body._id });
//     invitee.tripsInvitedTo.push(req.body.item);
//     await invitee.save();
//     res.status(200).send("Success");
//   } catch (error) {
//     console.log(error);
//   }
// });

router.put("/add-wishlist", ensureAuthenticated, async (req, res) => {
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

router.post("/get-wishlist", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.body.uid });
    if (user) {
      res.status(200).json(user.wishlist);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/remove-wishlist", ensureAuthenticated, async (req, res) => {
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

router.put("/edit-user", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.body.uid });
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email ? req.body.email : user.email;
    user.phone = req.body.phone ? req.body.phone : user.phone;
    user.bio = req.body.bio ? req.body.bio : user.bio;
    await user.save();
    if (user) {
      //   res.json(user);
      res.status(200).send("Success");
    }
  } catch (error) {
    console.log(error);
  }
});

//Profile Image Upload
router.put("/edit-profile-image", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    if (user.photoId) {
      await cloudinary.uploader.destroy(user.photoId);
    } else {
      const file = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: "user_profile_images",
      });
      user.photoURL = uploadResponse.secure_url || user.photoURL;
      user.photoId = uploadResponse.public_id || user.photoId;
      await user.save();
      res.status(200).send("Success");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
