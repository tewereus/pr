const mongoose = require("mongoose");

const colorSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true
    },
    hex_code: {
      type: String,
      required: true,
    },
    product_type: {
      type: String,
      required: true
    },
    sold: {
        type: Number,
        default: 0,
        min: 0,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Color", colorSchema);
