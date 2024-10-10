const Country = require("../../models/address/countryModel");
const validateMongoDbId = require("../../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");

const addCountry = asyncHandler(async (req, res) => {
  // const { id } = req.admin;
  try {
    const newCountry = await Country.create(req.body);
    res.json(newCountry);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCountries = asyncHandler(async (req, res) => {
  // const { id } = req.admin;
  try {
    const country = await Country.find();
    res.json(country);
  } catch (error) {
    throw new Error(error);
  }
});

const editCountry = asyncHandler(async (req, res) => {
  // const { id } = req.admin;
  const { addrId } = req.params;
  try {
    const country = await Country.findByIdAndUpdate(addrId, req.body, {
      new: true,
    });
    res.json(country);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCountry = asyncHandler(async (req, res) => {
  // const { id } = req.admin;
  const { addrId } = req.params;
  try {
    const country = await Country.findByIdAndDelete(addrId);
    res.json(country);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAllCountries = asyncHandler(async (req, res) => {
  // const { id } = req.admin;
  try {
    const country = await Country.deleteMany();
    res.json(country);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addCountry,
  getAllCountries,
  editCountry,
  deleteCountry,
  deleteAllCountries,
};
