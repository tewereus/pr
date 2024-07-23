const express = require('express')
const router = express.Router()
const {createImageCategory, getAllImageCategories, updateImageCategory, deleteImageCategory, deleteAllImageCategories} = require("../controllers/imgCategoryCtrl")

router.post("/create-image-category", createImageCategory)
router.get("/all-image-category", getAllImageCategories)
router.put("/:id", updateImageCategory)
router.delete("/delete/:id", deleteImageCategory)
router.delete("/delete-all", deleteAllImageCategories)

module.exports = router;