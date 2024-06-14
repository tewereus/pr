const ProductType = require("../models/productTypeModel");
const asyncHandler = require("express-async-handler");

const addProductType = asyncHandler(async (req, res) => {
  try {
    const productType = await ProductType.create(req.body);
    res.status(200).json(productType);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProdTypes = asyncHandler(async (req, res) => {
  try {
    const product = await ProductType.find();
    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addProductType,
  getAllProdTypes,
};
