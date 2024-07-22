const asyncHandler = require("express-async-handler");
const Wishlist = require("../models/wishlistModel");
const User = require("../models/userModel");

//not finished
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id)
    const alreadyAdded = await Wishlist.find((id) => id.toString === prodId)
    if(alreadyAdded){
      let wishlist = await Wishlist.findByIdAndDelete(prodId)
      res.status(201).json(wishlist)
    }else{
      let wishlist = await Wishlist.create(prodId) // maybe make it Wishlist.create(req.body) if the first one doesn't work
      res.status(201).json(wishlist)
    }
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

const removeWishlist = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  const { prodId} = req.params
  try {
    const removedWishlist = await Wishlist.findByIdAndDelete(prodId)
    res.status(200).json({message: "removed from favourites", removedWishlist})
  } catch (error) {
    throw new Error(error)
  }
})

const clearWishlist = asyncHandler(async (req, res) => {
  const {_id} = req.user
  try {
    const removeWishlists = await Wishlist.deleteMany()
    res.status(200).json({message: "All favourites cleared", removeWishlists})
  } catch (error) {
    throw new Error(error)
  }
})
module.exports = { addToWishlist, getWishlist, removeWishlist, clearWishlist };
