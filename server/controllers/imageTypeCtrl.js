const ImageType = require("../models/imageTypeModel")
const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler")

const createImageType = asyncHandler(async(req, res) => {
    try {
        const image = await ImageType.create(req.body)
        res.status(201).json(image)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllImageTypes = asyncHandler(async(req, res) => {
    try {
        const images = await ImageType.find()
        res.status(201).json(images)
    } catch (error) {
        throw new Error(error)
    }
})

const updateImageType = asyncHandler(async(req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const updatedImageType = await ImageType.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).json(updatedImageType)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteImageType = asyncHandler(async(req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const deletedImageType = await ImageType.findByIdAndDelete(id)
        res.status(201).json(deletedImageType)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteAllImageTypes = asyncHandler(async(req, res) => {
    try {
        const deleteImageTypes = await ImageType.deleteMany()
        res.status(201).json(deleteImageTypes)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createImageType, getAllImageTypes, updateImageType, deleteImageType, deleteAllImageTypes}