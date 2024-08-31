const express = require("express");
const router = express.Router();
const {
  createImage,
  getAllImages,
  deleteImage,
  deleteAllImages,
  updateImage,
} = require("../../controllers/image/imageCtrl");

router.post("/create-image", createImage);
router.get("/all-images", getAllImages);
router.put("/:id", updateImage);
router.delete("/delete/:id", deleteImage);
router.delete("/delete-all", deleteAllImages);

module.exports = router;
