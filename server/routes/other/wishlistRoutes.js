const express = require('express')
const router = express.Router()

const {addToWishlist, getWishlists, removeWishlist, clearWishlist} = require("../../controllers/other/wishlistCtrl")
const { authMiddleware } = require("../../middlewares/authMiddleware");


router.post("/addToWishlist",authMiddleware, addToWishlist)
router.get("/", authMiddleware,getWishlists)
router.delete("/:prodId", authMiddleware,removeWishlist)
router.delete("/clear-all", authMiddleware,clearWishlist)

module.exports = router;