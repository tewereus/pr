const asyncHandler = require("express-async-handler");
const Wishlist = require("../models/wishlistModel");

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
  } catch (error) {
    throw new Error(error);
  }
}); //unfinshed

module.exports = { addToWishlist };
