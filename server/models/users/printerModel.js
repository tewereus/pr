const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const printerSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      // required: [true, "full name is required"],
      set: (v) => v.trim().replace(/\s+/g, " "),
    },
    email: {
      type: String,
      //   required: true,
    },
    mobile: {
      type: String,
      required: [true, "mobile is required"],
      unique: [true, "mobile number already registered"],
      validate: {
        validator: function (v) {
          return /^\d{9}$/.test(v); // Validate that mobile contains exactly 9 digits
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    preference: {
      mode: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      language: {
        type: String,
        enum: ["en", "am"],
        default: "en",
      },
    },
    password: {
      type: String,
      default: "",
      // required: true,
      select: false,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
    },
    role: {
      type: String,
      default: "printer",
    },
    status: {
      // this is for the managers to make it inactive incase of an emergency
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    main_status: {
      type: String,
      require: true,
      enum: ["active", "inactive", "waiting", "unavailable"],
      default: "inactive",
    },
    payment: [
      {
        bankName: String,
        bankAccount: String, //hash this if needed
      },
    ],
    profile: {
      type: String,
      default: "",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    printerToken: { type: String },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

printerSchema.pre("save", function (next) {
  this.role = "printer";
  next();
});

printerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    next(err);
  }
  next();
});

printerSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Printer", printerSchema);
