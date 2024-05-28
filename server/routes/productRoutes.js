const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories,getaCategory } = require("../controllers/CategoryCtrl");
const { adminAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/create-product", adminAuthMiddleware, createCategory);
router.get("/all-products", adminAuthMiddleware, getAllCategories);
router.get("/:id", adminAuthMiddleware, getaCategory);

module.exports = router;
