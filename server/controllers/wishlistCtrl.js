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

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const wishlist = await Wishlist.find({ userId: _id });
    res.status(200).json(wishlist);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { addToWishlist, getWishlist };
