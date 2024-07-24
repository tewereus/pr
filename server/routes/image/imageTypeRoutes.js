const express = require('express')
const router = express.Router()
const {createImageType, getAllImageTypes, updateImageType, deleteImageType, deleteAllImageTypes} = require("../../controllers/image/imageTypeCtrl")

router.post("/create-image-type", createImageType)
router.get("/all-image-types", getAllImageTypes)
router.put("/:id", updateImageType)
router.delete("/delete/:id", deleteImageType)
router.delete("/delete-all", deleteAllImageTypes)

module.exports = router;