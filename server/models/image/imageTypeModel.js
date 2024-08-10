const mongoose = require("mongoose");

const imageType = mongoose.Schema(
  {
    image_type: {
        type: String,
        required: true,
        unique: true
    },
    image_category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImgCategory"
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

module.exports = mongoose.model("ImageType", imageType);
