const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products:[ {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product" // this should not be from Product instead some saved work that consists the product, color, image
      },
      count: Number,
      color: String // maybe bring color from Color model if there is
    },],
    address: {
        // type: [mongoose.Schema.Types.Mixed]   // check this out
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
        enum: ["Pending", "Proccessing", "Dispatched", "Cancelled", "Delivered"]
    },
    method: {
        type: String,
        enum: ["Cash on Delivery", "Bank"],
        required: true
    },
    refund: {
        type: String,
        enum: ["None", "Proccessing", "Not Refunded", "Refunded"],
        default: "None"
    },
    total: {
        type: Number
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
