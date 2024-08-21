const mongoose = require("mongoose");

const imgCategorySchema = mongoose.Schema(
  {
    image_category: {
      type: String,
      required: true,
      unique: true,
    },
    image_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImageType",
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

module.exports = mongoose.model("ImgCategory", imgCategorySchema);
