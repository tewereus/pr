const Coupon = require("../../models/other/couponModel")
const validateMongoDbId = require("../../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler")

const createCoupon = asyncHandler(async(req, res) => {
    try {
        const coupon = await Coupon.create(req.body)
        res.status(201).json(coupon)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCoupons = asyncHandler(async(req, res) => {
    try {
        const coupons = await Coupon.find()
        res.status(201).json(coupons)
    } catch (error) {
        throw new Error(error)
    }
})

const updateCoupon = asyncHandler(async(req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).json(updatedCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCoupon = asyncHandler(async(req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(id)
        res.status(201).json(deletedCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteAllCoupons = asyncHandler(async(req, res) => {
    try {
        const deleteCoupons = await Coupon.deleteMany()
        res.status(201).json(deleteCoupons)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createCoupon, getAllCoupons, updateCoupon, deleteCoupon, deleteAllCoupons}