const mongoose = require("mongoose");

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true
    },
    expiry: {
        type: Date,
        required: true
    },
    discount: {
      type: Number,
      required: true,
    },
    category: [{
      // type: String,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductTypes",
        default: "All" // not checked, check if this code works
      },
    },],
    limit: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupon", couponSchema);
