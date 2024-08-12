const Image = require("../../models/image/imageModel");
const validateMongoDbId = require("../../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");

const createImage = asyncHandler(async (req, res) => {
  try {
    const image = await Image.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllImages = asyncHandler(async (req, res) => {
  try {
    const images = await Image.find();
    res.status(201).json(images);
  } catch (error) {
    throw new Error(error);
  }
});

const updateImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedImage = await Image.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedImage);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedImage = await Image.findByIdAndDelete(id);
    res.status(201).json(deletedImage);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAllImages = asyncHandler(async (req, res) => {
  try {
    const deleteImg = await Image.deleteMany();
    res.status(201).json(deleteImg);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createImage,
  getAllImages,
  updateImage,
  deleteImage,
  deleteAllImages,
};
