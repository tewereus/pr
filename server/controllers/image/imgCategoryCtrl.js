const ImgCategory = require("../../models/image/imgCategoryModel")
const validateMongoDbId = require("../../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler")

const createImageCategory = asyncHandler(async(req, res) => {
    try {
        const image = await ImgCategory.create(req.body)
        res.status(201).json(image)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllImageCategories = asyncHandler(async(req, res) => {
    try {
        const images = await ImgCategory.find()
        res.status(201).json(images)
    } catch (error) {
        throw new Error(error)
    }
})

const updateImageCategory = asyncHandler(async(req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const updatedImgCategory = await ImgCategory.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).json(updatedImgCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteImageCategory = asyncHandler(async(req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const deletedImgCategory = await ImgCategory.findByIdAndDelete(id)
        res.status(201).json(deletedImgCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteAllImageCategories = asyncHandler(async(req, res) => {
    try {
        const deleteImgCategories = await ImgCategory.deleteMany()
        res.status(201).json(deleteImgCategories)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createImageCategory, getAllImageCategories, updateImageCategory, deleteImageCategory, deleteAllImageCategories}