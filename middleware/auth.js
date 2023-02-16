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
        res.send('Unauthorized');
      } else if (!tokenString[1]) {
        res.send('Unauthorized');
      } else {
        const { getAuth } = require("firebase-admin/auth");
        getAuth()
          .verifyIdToken(tokenString[1])
          .then((decodedToken) => {
            const uid = decodedToken.uid;
            // console.log(uid);
            next();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  };
