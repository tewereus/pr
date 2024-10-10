const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var locationSchema = new mongoose.Schema(
  {
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    region: {
      // like Addis ababa
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
      required: true,
    },
    location: {
      // like Yeka, Bole
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Location", locationSchema);
