const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteAllProducts,
  deleteProduct,
} = require("../../controllers/product/productCtrl");
const { adminAuthMiddleware } = require("../../middlewares/authMiddleware");

router.post("/create-product", createProduct);
router.get("/all-products", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.delete("/delete-all", deleteAllProducts);

module.exports = router;
