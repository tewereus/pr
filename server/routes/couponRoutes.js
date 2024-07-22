const express = require('express')
const router = express.Router()
const {createCoupon, getAllCoupons, updateCoupon, deleteCoupon, deleteAllCoupons} = require("../controllers/couponCtrl")

router.post("/create-coupon", createCoupon)
router.get("/all-coupons", getAllCoupons)
router.put("/update/:id", updateCoupon)
router.delete("/delete/:id", deleteCoupon)
router.delete("/delete-all", deleteAllCoupons)

module.exports = router;