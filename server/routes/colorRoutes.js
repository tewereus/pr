const express = require('express')
const router = express.Router()
const {createColor, getAllColors, updateColor, deleteColor, deleteAllColors} = require("../controllers/colorCtrl")

router.post("/create-color", createColor)
router.get("/all-colors", getAllColors)
router.put("/:id", updateColor)
router.delete("/delete/:id", deleteColor)
router.delete("/delete-all", deleteAllColors)

module.exports = router;