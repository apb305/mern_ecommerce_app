const express = require("express");
const app = express();
var cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const users = require("./routes/users");
const stripe = require("./routes/stripe");
const products = require("./routes/products");
const auth = require("./routes/auth");
const wishlist = require("./routes/wishlist")
require("dotenv").config();

//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Cors
app.use(cors());

//Use routes
app.use("/users", users);
app.use("/wishlist", wishlist);
app.use("/stripe", stripe);
app.use("/products", products);
app.use("/auth", auth);

// Serve Static assets for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
