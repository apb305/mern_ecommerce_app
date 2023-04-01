const mongoose = require("mongoose");
require("../models/Users");
const User = mongoose.model("users");
const asyncHandler = require("express-async-handler");

const getWishlistItems = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.body.uid });
    res.status(200).json(user.wishlist);
  } catch (error) {
    console.log(error.message)
   res.status(500).send("An error has occured")
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  try {
   await User.updateOne(
      { uid: req.body.uid },
      { $addToSet: { wishlist: req.body.data } }
    );
    const user = User.findOne({ uid: req.body.uid });
    res.status(200).json(user.wishlist);
  } catch (error) {
    console.log(error.message)
   res.status(500).send("An error has occured")
  }
});

const deleteWishlistItem = asyncHandler(async (req, res) => {
  try {
   await User.updateOne(
      { uid: req.body.uid },
      { $pull: { wishlist: { _id: req.body._id } } }
    );
    const user = User.findOne({ uid: req.body.uid });
    res.status(200).json(user.wishlist);
  } catch (error) {
    console.log(error.message)
   res.status(500).send("An error has occured")
  }
});

module.exports = {
    getWishlistItems,
    addToWishlist,
    deleteWishlistItem
}
