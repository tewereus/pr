const express = require('express')
const router = express.Router()

const {addToWishlist, getWishlist, removeWishlist, clearWishlist} = require('../controllers/wishlistCtrl')

router.post("/addToWishlist", addToWishlist)
router.get("/", getWishlist)
router.delete("/:prodId", removeWishlist)
router.delete("/clear-all", clearWishlist)

export default router;