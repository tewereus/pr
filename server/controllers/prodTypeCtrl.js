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

const deleteProdType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductType.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProdType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductType.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addProductType,
  getAllProdTypes,
  deleteProdType,
  updateProdType,
};
