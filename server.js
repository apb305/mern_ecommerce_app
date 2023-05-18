const express = require("express");
const app = express();
var cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const users = require("./routes/users");
const stripe = require("./routes/stripe");
const products = require("./routes/products");
const signup = require("./routes/signup");
const wishlist = require("./routes/wishlist")
const reviews = require("./routes/reviews")
// const cart = require("./routes/cart");
const webhook = require("./routes/webhook")
const { notFound, errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();

//Connect DB
connectDB();

app.use(cors());

//Stripe webhook
app.use("/api/webhook", express.raw({type: "*/*"}), webhook);

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));

//Routes
app.use("/api/users", users);
app.use("/api/wishlist", wishlist);
app.use("/api/products", products);
app.use("/api/reviews", reviews);
app.use("/api/signup", signup);
// app.use("/api/cart", cart)
app.use("/api/stripe", stripe);
app.use(notFound)
app.use(errorHandler)


// Serve Static assets for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
