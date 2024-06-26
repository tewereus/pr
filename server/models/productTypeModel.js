const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      // required: true,
      // unique: true,
      // index: true,
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductType", productTypeSchema);
