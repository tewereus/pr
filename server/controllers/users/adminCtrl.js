// in updateUser make it so that email can be updated by sending otp and mobile by message
// in updateUser it should follow the rules of the user schema like usernam should have minlength of 3 and mobile should be 9 digits long...
// (!Solved! but check again) problem with validateUser as it validates everything not just the one i want to update, like if i change username it also checks for mobile, email...,

const Admin = require("../../models/users/adminModel");
const User = require("../../models/users/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../../config/jwtToken");
const validateMongoDbId = require("../../utils/validateMongoDbId");
const { generateRefreshToken } = require("../../config/refreshtoken");
const validateUser = require("../../middlewares/validateUser");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/emailCtrl");
const crypto = require("crypto");
const Manager = require("../../models/users/managerModel");

// const registerUser = asyncHandler(async (req, res) => {
//   const { fullname, username, mobile, email, password,   profile } = req.body;
//   if (!fullname || !username || !mobile || !email || !password) {
//     return res.status(403).json({
//       success: false,
//       message: "All fields are required",
//     });
//   }
//   try {
//     const userExists = await Admin.findOne({ email: email });
//     if (!userExists) {
//       const profilePic =
//         profile === "" ? `https://avatar.iran.liara.run/public/boy` : profile;
//       const newUser = await Admin.create({
//         fullname,
//         username,
//         email,
//         mobile,
//         password,
//         profile: profilePic,
//       });
//       console.log(newUser);
//       res.json(newUser);
//     } else {
//       throw new Error("Email already exists");
//     }
//   } catch (error) {
//     if (error.code === 11000) {
//       if (error.keyPattern.username) {
//         throw new Error("Username already exists");
//       } else if (error.keyPattern.mobile) {
//         throw new Error("Mobile is already registered");
//       }
//     } else {
//       throw new Error(error);
//     }
//   }
// });

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const findAdmin = await Admin.findOne({ email });
  // if (findAdmin.role !== "administrator") throw new Error("Not Authorized"); // not needed

  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await Admin.findByIdAndUpdate(
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
    // res.json({
    //   _id: findAdmin?._id,
    //   firstname: findAdmin?.firstname,
    //   lastname: findAdmin?.lastname,
    //   role: findAdmin?.role,
    //   email: findAdmin?.email,
    //   mobile: findAdmin?.mobile,
    //   token: generateToken(findAdmin?._id),
    // });
    res.json({
      _id: findAdmin?._id,
      fullname: findAdmin?.fullname,
      username: findAdmin?.username,
      role: findAdmin?.role,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      preference: findAdmin?.preference,
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
  const user = await Admin.findOne({ refreshToken });
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

const viewAdminProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const user = await Admin.findById(id).select("-password");
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

const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  validateMongoDbId(id);

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await Admin.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    res.json(user);
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
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "role",
      "search",
      "searchField",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = User.find(JSON.parse(queryStr));

    // Search
    if (req.query.search) {
      const searchField = req.query.searchField; // Add this line to get the search field from the query parameters
      let searchQuery = {};

      // Determine which field to search based on the searchField parameter
      switch (searchField) {
        case "username":
          searchQuery = {
            username: { $regex: req.query.search, $options: "i" },
          };
          break;
        case "fullname":
          searchQuery = {
            fullname: { $regex: req.query.search, $options: "i" },
          };
          break;
        case "mobile":
          searchQuery = { mobile: { $regex: req.query.search, $options: "i" } };
          break;
        case "email":
          searchQuery = { email: { $regex: req.query.search, $options: "i" } };
          break;
        default:
          throw new Error("Invalid search field");
      }

      query = query.find(searchQuery);
    }
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

    // display users || admin
    if (req.query.role) {
      if (req.query.role === "All") {
        query = query.find();
      } else {
        query = query.find({ role: req.query.role });
      }
    }

    // display blocked/unblocked users
    if (req.query.isBlocked) {
      if (req.query.isBlocked === "All") {
        query = query.find();
      } else {
        query = query.find({ isBlocked: req.query.isBlocked });
      }
    }

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const usersCount = await User.countDocuments();
      if (skip >= usersCount) throw new Error("This Page does not exists");
    }
    // const usersCount = await User.countDocuments(JSON.parse(queryStr));
    // Get the total number of users
    const totalUsers = await User.countDocuments({
      $or: [
        { username: { $regex: req.query.search, $options: "i" } },
        { fullname: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    });
    const users = await query;
    res.json({ users, totalUsers });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllAdmins = asyncHandler(async (req, res) => {
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "search",
      "searchField",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Admin.find(JSON.parse(queryStr));

    // Search
    if (req.query.search) {
      const searchField = req.query.searchField; // Add this line to get the search field from the query parameters
      let searchQuery = {};

      // Determine which field to search based on the searchField parameter
      switch (searchField) {
        case "username":
          searchQuery = {
            username: { $regex: req.query.search, $options: "i" },
          };
          break;
        case "fullname":
          searchQuery = {
            fullname: { $regex: req.query.search, $options: "i" },
          };
          break;
        case "mobile":
          searchQuery = { mobile: { $regex: req.query.search, $options: "i" } };
          break;
        case "email":
          searchQuery = { email: { $regex: req.query.search, $options: "i" } };
          break;
        default:
          throw new Error("Invalid search field");
      }

      query = query.find(searchQuery);
    }
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
      const usersCount = await Admin.countDocuments();
      if (skip >= usersCount) throw new Error("This Page does not exists");
    }
    // const usersCount = await User.countDocuments(JSON.parse(queryStr));
    // Get the total number of users
    const totalUsers = await Admin.countDocuments({
      $or: [
        { username: { $regex: req.query.search, $options: "i" } },
        { fullname: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    });
    const users = await query;
    res.json({ users, totalUsers });
  } catch (error) {
    throw new Error(error);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await Admin.findOne({ email: email });
  if (!user) throw new Error("No user found");
  try {
    const token = await user.createResetPasswordToken();
    await user.save();
    const resetUrl = `Hi please follow this link to reset your password. This link is valid for 10 minutes from now <a href='http://localhost:5000/api/v1/user/reset-password/${token}'>Click Here</a>`;
    const data = {
      to: email,
      subject: "Forgot password Link",
      text: "Hello admin whats up",
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
  const user = await Admin.findOne({
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

const checkAdminPass = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if admin exists or not
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

const addManager = asyncHandler(async (req, res) => {
  // const {id} = req.user
  const { mobile, email } = req.body;
  try {
    const manager = await Manager.findOne({ mobile });
    if (manager) throw new Error("Manager with this mobile already exists");
    const newManager = await Manager.create({ mobile, email }); // check if it can be added with await manager.save()
    const token = await newManager.createManagerToken();
    await newManager.save();
    console.log(token);
    // const messageUrl = `Hi please follow this link to start your journey as a manager. This link is valid for 1 hour from now <a href='http://localhost:5000/api/v1/manager/manager/${token}'>Click Here</a>`;
    // const data = {
    //   to: email,
    //   subject: "Verify Account",
    //   text: "Hey future manager",
    //   htm: messageUrl,
    // };
    // sendEmail(data);
    res.json(newManager);
  } catch (error) {
    throw new Error(error);
  }
});

const changeMainStatus = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { main_status } = req.body;
  const { id } = req.params;
  try {
    const isAdmin = await Admin.findById(_id);
    if (!isAdmin) throw new Error("Not Authorized");
    const newManager = await Manager.findByIdAndUpdate(
      id,
      {
        main_status: main_status,
      },
      {
        new: true,
      }
    );
    res.json(newManager);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllManagers = asyncHandler(async (req, res) => {
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "search",
      "searchField",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Manager.find(JSON.parse(queryStr));

    // Search
    if (req.query.search) {
      const searchField = req.query.searchField; // Add this line to get the search field from the query parameters
      let searchQuery = {};

      // Determine which field to search based on the searchField parameter
      switch (searchField) {
        case "username":
          searchQuery = {
            username: { $regex: req.query.search, $options: "i" },
          };
          break;
        case "fullname":
          searchQuery = {
            fullname: { $regex: req.query.search, $options: "i" },
          };
          break;
        case "mobile":
          searchQuery = { mobile: { $regex: req.query.search, $options: "i" } };
          break;
        case "email":
          searchQuery = { email: { $regex: req.query.search, $options: "i" } };
          break;
        default:
          throw new Error("Invalid search field");
      }

      query = query.find(searchQuery);
    }

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
      const usersCount = await Manager.countDocuments();
      if (skip >= usersCount) throw new Error("This Page does not exists");
    }
    // const usersCount = await User.countDocuments(JSON.parse(queryStr));
    // Get the total number of users
    const totalUsers = await Manager.countDocuments();
    const users = await query;
    res.json({ users, totalUsers });
  } catch (error) {
    throw new Error(error);
  }
});

const toggleDarkMode = asyncHandler(async (req, res) => {
  const { id } = req.admin;
  const { mode } = req.body.preference;
  try {
    const darkmode = await Admin.findByIdAndUpdate(
      id,
      { "preference.mode": mode },
      {
        new: true,
        runValidators: true, // Optional: Ensure that validators are run
      }
    );
    res.json(darkmode);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  // registerUser,
  loginAdmin,
  logout,
  viewAdminProfile,
  getaUser,
  //   updateUser,
  updatePassword,
  blockUser,
  unblockUser,
  deleteUser,
  deleteAllUsers,
  forgotPasswordToken,
  resetPassword,
  getAllUsers,
  getAllAdmins,
  checkAdminPass,
  addManager,
  changeMainStatus,
  getAllManagers,
  toggleDarkMode,
};
