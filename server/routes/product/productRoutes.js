const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteAllProducts,
  deleteProduct,
  uploadImages,
} = require("../../controllers/product/productCtrl");
const { adminAuthMiddleware } = require("../../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../../middlewares/uploadImage");

router.post("/create-product", createProduct);
router.get("/all-products", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.delete("/delete-all", deleteAllProducts);
router.put(
  "/upload/:id",
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

module.exports = router;
