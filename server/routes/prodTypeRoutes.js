const express = require("express");
const router = express.Router();
const {
  addProductType,
  getAllProdTypes,
} = require("../controllers/prodTypeCtrl");
const { adminAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/add-product-type", addProductType);
router.get("/get-product-types", getAllProdTypes);

module.exports = router;
