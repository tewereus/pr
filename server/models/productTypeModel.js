const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fabric: {
      type: String,
      enum: ["cotton", "poly"],
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("productType", productTypeSchema);
