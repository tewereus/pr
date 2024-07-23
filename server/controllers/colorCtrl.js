const Color = require("../models/colorModel")
const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler")

const createColor = asyncHandler(async(req, res) => {
    try {
        const color = await Color.create(req.body)
        res.status(201).json(color)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllColors = asyncHandler(async(req, res) => {
    try {
        const colors = await Color.find()
        res.status(201).json(colors)
    } catch (error) {
        throw new Error(error)
    }
})

const updateColor = asyncHandler(async(req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const updatedColor = await Color.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).json(updatedColor)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteColor = asyncHandler(async(req, res) => {
    const {id} = req.params
    validateMongoDbId(id)
    try {
        const deletedColor = await Color.findByIdAndDelete(id)
        res.status(201).json(deletedColor)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteAllColors = asyncHandler(async(req, res) => {
    try {
        const deleteColors = await Color.deleteMany()
        res.status(201).json(deleteColors)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createColor, getAllColors, updateColor, deleteColor, deleteAllColors}