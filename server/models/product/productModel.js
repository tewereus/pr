const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    color: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
      },
    ],
    product_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
