const User = require("../models/userModel");
const Category = require("../models/CategoryModel");
const ProductType = require("../models/productTypeModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

const slugify = require("slugify");

const createCategory = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id)
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const getaCategory = asyncHandler(async (req, res) => {
  const {id} = req.params
  try {
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const {id} = req.params
  try {
    if (req.body.title) {
         req.body.slug = slugify(req.body.title);
      }
    const category = await Category.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const {id} = req.params
  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAllCategories = asyncHandler(async (req, res) => {
  try {
    const category = await Category.deleteMany();
    res.status(200).json(category);
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = {
  createCategory,
  getAllCategories,
  getaCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories
};
