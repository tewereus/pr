const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productCtrl");
const { adminAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/create-product", adminAuthMiddleware, createProduct);

module.exports = router;
