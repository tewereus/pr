const express = require('express')
const router = express.Router()

const {addToWishlist, getWishlist, removeWishlist, clearWishlist} = require('../controllers/wishlistCtrl')
const { authMiddleware, authorize } = require("../middlewares/authMiddleware");


router.post("/addToWishlist",authMiddleware, addToWishlist)
router.get("/", authMiddleware,getWishlist)
router.delete("/:prodId", authMiddleware,removeWishlist)
router.delete("/clear-all", authMiddleware,clearWishlist)

export default router;