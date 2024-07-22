const mongoose = require("mongoose");

const colorSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        unique: true
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
