// in updateUser make it so that email can be updated by sending otp and mobile by message
// in updateUser it should follow the rules of the user schema like usernam should have minlength of 3 and mobile should be 9 digits long...
// (!Solved! but check again) problem with validateUser as it validates everything not just the one i want to update, like if i change username it also checks for mobile, email...,

const User = require("../models/userModel");
const OTP = require("../models/otpModel");
// const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongoDbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const validateUser = require("../middlewares/validateUser");
const bcrypt = require("bcryptjs");
const sendEmail = require("./emailCtrl");
const crypto = require("crypto");

const validateUserRegister = asyncHandler(async (req, res) => {
  const { fullname, username, mobile, email, password, confirmPassword } =
    req.body;
  if (
    !fullname ||
    !username ||
    !mobile ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    res.status(400).json("All fields are required");
  }

  if (fullname && fullname.trim().length < 3) {
    res.status(400).json("Full name must be at least 3 characters long");
  }

  const userExistsByUsername = await User.findOne({ username: username });
  if (userExistsByUsername) {
    res.status(400).json("Username already exists");
  }
  if (username && (username.length < 3 || username.length > 12)) {
    res.status(400).json("Username must be between 3 and 12 characters long");
  }

  const userExistsByEmail = await User.findOne({ email: email });
  if (userExistsByEmail) {
    res.status(400).json("Email already exists");
  }
  if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    res.status(400).json("Please input a valid email address");
  }

  const userExistsByMobile = await User.findOne({ mobile: mobile });
  if (userExistsByMobile) {
    res.status(400).json("Mobile is already registered");
  }
  if (mobile && !/^\d{9}$/.test(mobile)) {
    res.status(400).json("Mobile number must contain exactly 9 digits");
  }
  if (
    password &&
    (password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password))
  ) {
    res
      .status(400)
      .json(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
  }

  if (password !== confirmPassword) {
    res.status(400).json("Passwords do not match");
  }
  res.status(200).json("validation successfully passed");
});

const registerUser = asyncHandler(async (req, res) => {
  const {
    fullname,
    username,
    mobile,
    email,
    password,
    confirmPassword,
    otp,
    profile,
  } = req.body;
  if (!fullname || !username || !mobile || !email || !password || !otp) {
    return res.status(403).json({
      success: false,
      message: "All fields are required",
    });
  }
  if (password !== confirmPassword) {
    return res.status(403).json({
      success: false,
      message: "passwords do not match",
    });
  }
  try {
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      const response = await OTP.find({ email })
        .sort({ createdAt: -1 })
        .limit(1);
      if (response.length === 0 || otp !== response[0].otp) {
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        });
      }

      const profilePic =
        profile === "" ? `https://avatar.iran.liara.run/public/boy` : profile;
      const newUser = await User.create({
        fullname,
        username,
        email,
        mobile,
        password,
        profile: profilePic,
      });
      console.log(newUser);
      res.json(newUser);
    } else {
      throw new Error("Email already exists");
    }
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.username) {
        throw new Error("Username already exists");
      } else if (error.keyPattern.mobile) {
        throw new Error("Mobile is already registered");
      }
    } else {
      throw new Error(error);
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      message: "logged in successfully",
      _id: findUser?._id,
      name: findUser?.fullname,
      username: findUser?.username,
      email: findUser?.email,
      mobile: findUser?.mobile,
      profile: findUser?.profile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Incorrect email or password");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  // const findAdmin = await Admin.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorized");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  user.refreshToken = "";
  await user.save();

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  // Remove the token from headers.authorization
  if (req.headers.authorization) {
    req.headers.authorization = ""; // Clear the Authorization header
  }
  res.sendStatus(204); // forbidden
});

const viewProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);

  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Exclude the password field from the req.body object
  const { password, ...updateData } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    // Validate the updated user data against the user schema
    const { error } = validateUser(user);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  validateMongoDbId(id);

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user blocked successfully",
      blockUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user unblocked successfully",
      unblockUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findByIdAndDelete(id);
    res.json({
      message: "Account deleted successfully",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      message: "user deleted successfully",
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAllUsers = asyncHandler(async (req, res) => {
  try {
    const deleteUser = await User.deleteMany({ role: "user" });
    res.json({
      message: "All users deleted successfully",
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  // try {
  //   const users = await User.find({ role: "user" });
  //   res.json(users);
  // } catch (err) {
  //   throw new Error(err);
  // }
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "role"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = User.find(JSON.parse(queryStr));

    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const userCount = await User.countDocuments();
      if (skip >= userCount) throw new Error("This Page does not exists");
    }

    const user = await query;
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// const getAllUsers = asyncHandler(async (req, res) => {
//     let { page, searchValue, parPage } = req.query
//     page = parseInt(page)
//     parPage = parseInt(parPage)

//     const skipPage = parPage * (page - 1)

//     try {
//         if (searchValue) {
//             const users = await sellerModel.find({
//                 $text: { $search: searchValue }
//             }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

//             const totalUsers = await sellerModel.find({
//                 $text: { $search: searchValue }
//             }).countDocuments()

//             responseReturn(res, 200, { totalSeller, sellers })
//         } else {
//             const users = await sellerModel.find().skip(skipPage).limit(parPage).sort({ createdAt: -1 })
//             const totalUsers = await sellerModel.find().countDocuments()
//             responseReturn(res, 200, { totalSeller, sellers })
//         }

//     } catch (error) {
//         console.log('active seller get ' + error.message)
//     }
// })

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("No user found");
  try {
    const token = await user.createResetPasswordToken();
    await user.save();
    const resetUrl = `Hi please follow this link to reset your password. This link is valid for 10 minutes from now <a href='http://localhost:5000/api/v1/user/reset-password/${token}'>Click Here</a>`;
    const data = {
      to: email,
      subject: "Forgot password Link",
      text: "Hey user",
      htm: resetUrl,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

/*const forgotAdminPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email: email });
  if (!admin) throw new Error("No user found");
  try {
    const token = await admin.createResetPasswordToken();
    await admin.save();
    const resetUrl = `Hi please follow this link to reset your password. This link is valid for 10 minutes from now <a href='http://localhost:5000/api/v1/user/reset-password/${token}'>Click Here</a>`;
    const data = {
      to: email,
      subject: "Forgot password Link",
      text: "Hey admin",
      htm: resetUrl,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetAdminPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const admin = await Admin.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!admin) throw new Error("Token Expired, please try again later");
  admin.password = password;
  admin.passwordResetToken = undefined;
  admin.passwordResetExpires = undefined;
  await admin.save();
  res.json(admin);
});
*/

module.exports = {
  validateUserRegister,
  registerUser,
  loginUser,
  loginAdmin,
  logout,
  viewProfile,
  getaUser,
  updateUser,
  updatePassword,
  blockUser,
  unblockUser,
  deleteAccount,
  deleteUser,
  deleteAllUsers,
  forgotPasswordToken,
  resetPassword,
  // forgotAdminPasswordToken,
  // resetAdminPassword,
  getAllUsers,
};
