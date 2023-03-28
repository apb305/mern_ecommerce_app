const mongoose = require("mongoose");
require("../models/Users");
const User = mongoose.model("users");

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    const admin = require("firebase-admin");
    const serviceAccount = require("../config/firebase");

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    const tokenString = req.headers["authorization"]
      ? req.headers["authorization"].split(" ")
      : null;

    if (!tokenString) {
      res.send("Access denied");
    } else if (!tokenString[1]) {
      res.send("Access denied");
    } else {
      const { getAuth } = require("firebase-admin/auth");
      getAuth()
        .verifyIdToken(tokenString[1])
        .then(() => {
          next();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  isAdmin: async (req, res, next) => {
    const admin = await User.findOne({ uid: req.body.uid });
    if (!admin.isAdmin) {
      res.status(403).send("Unauthorized")
    } else {
      next();
    }
  },
};
