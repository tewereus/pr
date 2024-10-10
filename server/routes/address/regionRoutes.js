const express = require("express");
const {
  addRegion,
  getAllRegions,
  editRegion,
  deleteRegion,
  deleteAllRegions,
} = require("../../controllers/address/regionCtrl");
const router = express.Router();

router.post("/add-region", addRegion);
router.get("/all-regions", getAllRegions);
router.put("/edit-region/:addrId", editRegion);
router.delete("/delete/:addrId", deleteRegion);
router.delete("/delete-all", deleteAllRegions);

module.exports = router;
