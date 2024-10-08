const Address = require("../../models/other/addressModel");
const validateMongoDbId = require("../../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");

const addAddress = asyncHandler(async (req, res) => {
  // const { id } = req.admin;
  try {
    const newAddress = await Address.create(req.body);
    res.json(newAddress);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllAddresses = asyncHandler(async (req, res) => {
  // const { id } = req.admin;
  try {
    const address = await Address.find();
    res.json(address);
  } catch (error) {
    throw new Error(error);
  }
});

const editAddress = asyncHandler(async (req, res) => {
  // const { id } = req.admin;
  const { addrId } = req.params;
  try {
    const address = await Address.findByIdAndUpdate(addrId, req.body, {
      new: true,
    });
    res.json(address);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAddress = asyncHandler(async (req, res) => {
  // const { id } = req.admin;
  const { addrId } = req.params;
  try {
    const address = await Address.findByIdAndDelete(addrId);
    res.json(address);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAllAddresses = asyncHandler(async (req, res) => {
  // const { id } = req.admin;
  try {
    const address = await Address.deleteMany();
    res.json(address);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addAddress,
  getAllAddresses,
  editAddress,
  deleteAddress,
  deleteAllAddresses,
};
