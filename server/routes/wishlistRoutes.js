const express = require('express')
const router = express.Router()

const {addToWishlist, getWishlist, removeWishlist} = require('../controllers/wishlistCtrl')

router.post("/addToWishlist", addToWishlist)
router.get("/", getWishlist)
router.delete("/:prodId", removeWishlist)

export default router;