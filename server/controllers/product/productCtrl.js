const User = require("../../models/users/userModel");
const ProductType = require("../../models/product/productTypeModel");
const Product = require("../../models/product/productModel");
const QRCode = require("qrcode");
const CryptoJS = require("crypto-js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoDbId");

const slugify = require("slugify");
const { default: mongoose } = require("mongoose");
const { cloudinaryUploadImg } = require("../../utils/cloudinary");
const fs = require("fs");

const createProduct = asyncHandler(async (req, res) => {
  // const { id } = req.user;
  // validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.product_type)) {
      return res.status(400).json({ message: "Invalid product type" });
    }
    const product = await Product.create(req.body);
    console.log(product);
    const qrData = JSON.stringify({
      app: "Onprintz",
      id: product._id,
      price: product.basePrice,
      type: product.product_type,
      description: product.description,
    });
    // console.log(qrData);
    const encryptedData = CryptoJS.AES.encrypt(qrData, "hello").toString();
    // console.log(encryptedData);
    // Generate QR code
    const qrCode = await QRCode.toDataURL(encryptedData);
    res.status(201).json({ product, qrCode });
    console.log(product, qrCode);
    // res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find().populate("product_type color");
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

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      // fs.unlinkSync(path);
    }
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );

    res.json(findProduct);
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
  uploadImages,
};
