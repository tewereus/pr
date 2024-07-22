const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // the products down below should go to some saved work model that consists the product, color, image
    products:[{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Color"
        },
      count: Number,
    }],
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
    },
    totalOrdered: {
        type: Number,
        default: 0,
        min: 0,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
