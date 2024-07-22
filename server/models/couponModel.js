const mongoose = require("mongoose");

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    expiry: {
        type: Date,
        required: true
    },
    discount: {
      type: Number,
      required: true,
    },
    category: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductTypes",
      enum:["All", "tshirt", "hoodie"] // see problem in tobeDone file
    },
    limit: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupon", couponSchema);
