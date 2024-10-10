const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    country_name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    currency: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Country", countrySchema);
