const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const checkAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await Admin.findOne({ email });
  if (findAdmin.role !== "administrator") throw new Error("Not Authorized");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      role: findAdmin?.role,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = {
  checkAdmin,
};
