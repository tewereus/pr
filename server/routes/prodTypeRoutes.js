const express = require("express");
const router = express.Router();
const {
  addProductType,
  getAllProdTypes,
  deleteProdType,
} = require("../controllers/prodTypeCtrl");
const { adminAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/add-product-type", addProductType);
router.get("/get-product-types", getAllProdTypes);
router.delete("/delete-product-types/:id", deleteProdType);

module.exports = router;
