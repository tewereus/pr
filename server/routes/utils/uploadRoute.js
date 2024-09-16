const express = require("express");
const { adminAuthMiddleware } = require("../../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../../middlewares/uploadImage");
const {
  deleteImages,
  uploadImages,
} = require("../../controllers/utils/uploadCtrl");
const router = express.Router();

router.post(
  "/",
  // adminAuthMiddleware,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

router.delete("/delete-img/:id", adminAuthMiddleware, deleteImages);

module.exports = router;
