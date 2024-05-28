const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories } = require("../controllers/CategoryCtrl");
const { adminAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/create-product", adminAuthMiddleware, createCategory);
router.get("/all-products", adminAuthMiddleware, getAllCategories);

module.exports = router;
