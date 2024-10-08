const express = require("express");
const {
  addAddress,
  getAllAddresses,
  editAddress,
  deleteAddress,
} = require("../../controllers/other/addressCtrl");
const router = express.Router();

router.post("/add-address", addAddress);
router.get("/all-addresses", getAllAddresses);
router.put("/edit-address/:addrId", editAddress);
router.delete("/delete-address/:addrId", deleteAddress);

module.exports = router;
