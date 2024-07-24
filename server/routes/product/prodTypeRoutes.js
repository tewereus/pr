const express = require("express");
const router = express.Router();
const {
  addProductType,
  getAllProdTypes,
  deleteAllProdTypes,
  deleteProdType,
  updateProdType,
} = require("../../controllers/product/prodTypeCtrl");
const { adminAuthMiddleware } = require("../../middlewares/authMiddleware");

router.post("/add-product-type", addProductType);
router.get("/get-product-types", getAllProdTypes);
router.delete("/delete-product-types", deleteAllProdTypes);
router.delete("/:id", deleteProdType);
router.put("/:id", updateProdType);

module.exports = router;
