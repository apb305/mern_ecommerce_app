const mongoose = require("mongoose");
require("../models/Users");
const User = mongoose.model("users");
const asyncHandler = require("express-async-handler");

const getWishlistItems = asyncHandler(async (req, res) => {
  const user = await User.findOne({ uid: req.body.uid });
  if (user) {
    res.status(200).json(user.wishlist);
  } else {
    res.status(400).send("An error has occured");
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  await User.updateOne(
    { uid: req.body.uid },
    { $addToSet: { wishlist: req.body.data } }
  );
  const user = User.findOne({ uid: req.body.uid });
  if (user) {
    res.status(200).json(user.wishlist);
  } else {
    res.status(400).send("An error has occured");
  }
});

const deleteWishlistItem = asyncHandler(async (req, res) => {
  await User.updateOne(
    { uid: req.body.uid },
    { $pull: { wishlist: { _id: req.body._id } } }
  );
  const user = User.findOne({ uid: req.body.uid });
  if (user) {
    res.status(200).json(user.wishlist);
  } else {
    res.status(400).send("An error has occured");
  }
});

module.exports = {
  getWishlistItems,
  addToWishlist,
  deleteWishlistItem,
};
