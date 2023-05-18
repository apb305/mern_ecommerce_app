// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// require("../models/Cart");
// const Cart = mongoose.model("cart");
// const { ensureAuthenticated } = require("../middleware/auth");
// // const { cloudinary } = require("../config/cloudinary");

// router.post("/", ensureAuthenticated, async (req, res) => {
//   try {
//     const cartExits = await Cart.findOne({ uid: req.body.uid });
//     if (cartExits) {
//      const updatedCart = [cartExits, ...req.body.items]
//       await Cart.updateOne(
//         { uid: req.body.uid },
//         { $set: { items: updatedCart } }
//       );
//     } else {
//       const cart = new Cart({
//         uid: req.body.uid,
//         items: req.body.items,
//       });
//       cart.save();
//       res.status(200).json(cart);
//     }
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).send("An error has occured")
//   }
// });

// router.put("/", ensureAuthenticated, async (req, res) => {
//   try {
//     await Cart.updateOne(
//       { uid: req.body.uid },
//       { $addToSet: { wishlist: req.body.data } }
//     );
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).send("An error has occured")
//   }
// });

// router.delete("/", ensureAuthenticated, async (req, res) => {
//   try {
//     await User.updateOne(
//       { uid: req.body.uid },
//       { $pull: { wishlist: { _id: req.body._id } } }
//     );
//     res.status(200).json("Success");
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).send("An error has occured")
//   }
// });

// module.exports = router;
