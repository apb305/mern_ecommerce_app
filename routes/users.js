const express = require("express");
const router = express.Router();
const { getUser, updateUser } = require("../controllers/usersController");
require("../models/Users");
const { ensureAuthenticated } = require("../middleware/auth");

router
  .route("/")
  .post(ensureAuthenticated, getUser).put(ensureAuthenticated, updateUser)
router


// router.post("/", ensureAuthenticated, async (req, res) => {
//   try {
//     const user = await User.findOne({ uid: req.body.uid });
//     if (user) {
//       res.status(200).json(user);
//     }
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).json("An error has occured")
//   }
// });

// router.put("/", ensureAuthenticated, async (req, res) => {
//   try {
//     const user = await User.findOne({ uid: req.body.uid });
//     user.name = req.body.name ? req.body.name : user.name;
//     user.email = req.body.email ? req.body.email : user.email;
//     user.phone = req.body.phone ? req.body.phone : user.phone;
//     user.bio = req.body.bio ? req.body.bio : user.bio;
//     await user.save();
//     if (user) {
//       res.status(200).json(user);
//     }
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).send("An error has occured")
//   }
// });

// //Profile Image Upload
// router.put("/edit-profile-image", ensureAuthenticated, async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.body._id });
//     if (user.photoId) {
//       await cloudinary.uploader.destroy(user.photoId);
//     } else {
//       const file = req.body.data;
//       const uploadResponse = await cloudinary.uploader.upload(file, {
//         upload_preset: "user_profile_images",
//       });
//       user.photoURL = uploadResponse.secure_url || user.photoURL;
//       user.photoId = uploadResponse.public_id || user.photoId;
//       await user.save();
//       res.status(200).send("Success");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
