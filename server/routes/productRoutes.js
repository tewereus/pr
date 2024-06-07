const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteAllProducts,
  deleteProduct,
} = require("../controllers/productCtrl");
const { adminAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/create-product", adminAuthMiddleware, createProduct);
router.get("/all-products", adminAuthMiddleware, getAllProducts);
router.get("/:id", adminAuthMiddleware, getProduct);
router.put("/:id", adminAuthMiddleware, updateProduct);
router.delete("/:id", adminAuthMiddleware, deleteProduct);
router.delete("/delete-all", adminAuthMiddleware, deleteAllProducts);

module.exports = router;
