const User = require("../models/userModel");
const ProductType = require("../models/productTypeModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  // const { id } = req.user;
  // validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAllProducts = asyncHandler(async (req, res) => {
  try {
    const deletedProducts = await Product.deleteMany();
    if (deletedProducts.deletedCount === 0) {
      res.json({ message: "No products found to delete" });
    } else {
      res
        .status(200)
        .json({ message: `${deletedProducts.deletedCount} products deleted` });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
