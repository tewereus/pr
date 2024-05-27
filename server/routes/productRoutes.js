const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts } = require("../controllers/productCtrl");
const { adminAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/create-product", adminAuthMiddleware, createProduct);
router.get("/all-products", adminAuthMiddleware, getAllProducts);

module.exports = router;
