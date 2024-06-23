const express = require("express");
const router = express.Router();
const {
  addProductType,
  getAllProdTypes,
  deleteProdType,
  updateProdType,
} = require("../controllers/prodTypeCtrl");
const { adminAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/add-product-type", addProductType);
router.get("/get-product-types", getAllProdTypes);
router.delete("/:id", deleteProdType);
router.put("/:id", updateProdType);

module.exports = router;
