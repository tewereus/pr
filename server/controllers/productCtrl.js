const User = require("../models/userModel");
const Product = require("../models/productModel");
const ProdType = require("../models/prodTypeModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  const { id } = req.user;
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
  const { id } = req.user;
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getAllProducts,
};
