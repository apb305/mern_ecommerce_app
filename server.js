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
const reviews = require("./routes/reviews")
const cart = require("./routes/cart")
require("dotenv").config();

//Connect DB
connectDB();

//Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cors
app.use(cors());

//Use routes
app.use("/api/users", users);
app.use("/api/wishlist", wishlist);
app.use("/api/stripe", stripe);
app.use("/api/products", products);
app.use("/api/reviews", reviews);
app.use("/api/auth", auth);
app.use("/api/cart", cart)

// Serve Static assets for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
