const mongoose = require("mongoose");
require("../models/Products");
require("../models/Reviews");
const Products = mongoose.model("products");
const { cloudinary } = require("../config/cloudinary");
const asyncHandler = require("express-async-handler")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 9;
  const page = Number(req.query.pageNumber) || 1;
  //Info regarding querying
  //https://www.mongodb.com/docs/manual/reference/operator/query/regex/
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

    const count = await Products.countDocuments({ ...keyword });
    const products = await Products.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    if (products) {
      res
        .status(200)
        .json({ products, page, pages: Math.ceil(count / pageSize) });
    }
});

const getProduct = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid product ID" });
    }
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ msg: "Product not found" });
    }
    res.status(200).json({ product });
});


const addProduct = asyncHandler(async (req, res) => {

  const {
    imageFile,
    productName,
    productPrice,
    productDescription,
    productCategory,
  } = req.body.data;

  const stripePriceFormatted = productPrice.replace(".", "")
    //Upload product image to Cloudinary
    const response = await cloudinary.uploader.upload(imageFile, {
      upload_preset: "ecommerce",
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
    });

    //Create new product in stripe
    const stripeProduct = await stripe.products.create({
      name: productName,
      default_price_data: {
        currency: "usd",
        unit_amount_decimal: stripePriceFormatted,
      },
      images: [response.secure_url],
    });

    //Save product to mongodb database
    const newProduct = new Products({
      productName: productName,
      productPrice: productPrice,
      productDescription: productDescription,
      category: productCategory,
      priceID: stripeProduct.default_price,
      img: response.secure_url,
    });

    await newProduct.save();
    res.status(200).send("Success");
});


const editProduct = asyncHandler(async (req, res) => {
    const product = await Products.findById({ _id: req.body._id });
    if (product.photoId) {
      await cloudinary.uploader.destroy(product.photoId);
    } else {
      const file = req.body.data;
      const response = await cloudinary.uploader.upload(file);
      product.img = response.secure_url || product.img;
      product.photoId = response.public_id || product.photoId;
      await product.save();
      res.status(200).send("Success");
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
      const product = await Products.findById({ _id: req.body._id });
      if (product.photoId) {
        await cloudinary.uploader.destroy(product.photoId);
      } else {
        const file = req.body.data;
        const response = await cloudinary.uploader.upload(file);
        product.img = response.secure_url || product.img;
        product.photoId = response.public_id || product.photoId;
        await product.save();
        res.status(200).send("Success");
      }
  });
  
module.exports = {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct
}