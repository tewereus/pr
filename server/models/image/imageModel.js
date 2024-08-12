const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    image: [
      {
        type: String,
        required: true,
      },
    ],
    image_catagory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImgCategory",
        required: true,
      },
    ],
    image_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImageType",
      required: true,
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

module.exports = mongoose.model("Image", imageSchema);
