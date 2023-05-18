const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/productsController");
const { isAdmin, ensureAuthenticated } = require("../middleware/auth");

router.route("/").post(getProducts);

router.route("/add-product").post(ensureAuthenticated, isAdmin, addProduct);

router
  .route("/:id")
  .post(getProduct)
  .put(ensureAuthenticated, isAdmin, editProduct)
  .delete(ensureAuthenticated, isAdmin, deleteProduct);

module.exports = router;
