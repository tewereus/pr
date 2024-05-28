const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories,getaCategory, updateCategory, deleteAllCategories, deleteCategory } = require("../controllers/CategoryCtrl");
const { adminAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/create-product", adminAuthMiddleware, createCategory);
router.get("/all-products", adminAuthMiddleware, getAllCategories);
router.get("/:id", adminAuthMiddleware, getaCategory);
router.put("/:id", adminAuthMiddleware, updateCategory);
router.delete("/:id", adminAuthMiddleware, deleteCategory);
router.delete("/delete-all", adminAuthMiddleware, deleteAllCategories);


module.exports = router;
