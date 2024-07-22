const mongoose = require("mongoose");

const colorSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        unique: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Color", colorSchema);
