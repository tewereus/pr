const express = require("express");
const {
  addCountry,
  getAllCountries,
  editCountry,
  deleteCountry,
  deleteAllCountries,
} = require("../../controllers/address/countryCtrl");
const router = express.Router();

router.post("/add-country", addCountry);
router.get("/all-countries", getAllCountries);
router.put("/edit-country/:addrId", editCountry);
router.delete("/delete/:addrId", deleteCountry);
router.delete("/delete-all", deleteAllCountries);

module.exports = router;
