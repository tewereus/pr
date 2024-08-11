const Manager = require("../../models/users/managerModel");
const asyncHandler = require("express-async-handler");
// const url = require('url')

// const verifyManagerToken = asyncHandler(async (req, res) => {
//     const { token } = req.params; // Extract token from URL parameters
//     try {
//       const manager = await Manager.findOne({ unique_id: token }); // Find manager by unique_id
//       console.log("manager token: ", token);

//       if (!manager) {
//         return res.status(404).json({ message: "No manager found" }); // Return 404 if no manager is found
//       }

//       console.log("Manager status:", manager.main_status);

//       // Handle based on the manager's main status
//       switch (manager.main_status) {
//         case "inactive":
//           console.log("Redirecting to register");
//           return res.redirect(`http://localhost:3000/admin`); // Redirect to client app for registration

//         case "active":
//           console.log("Redirecting to login");
//           return res.redirect(`http://localhost:3000/admin/login`); // Redirect to client app for login

//         case "unavailable":
//           console.log("Redirecting to 404 page");
//           return res.redirect(`http://localhost:3000/404-page`); // Redirect to client app for 404 page

//         default:
//           console.log("Invalid main_status value");
//           return res.status(400).json({ message: "Invalid main_status value" }); // Handle unexpected status
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       return res.status(500).json({ message: error.message }); // Return error message
//     }
//   });

const verifyManager = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { mobile } = req.body;

  try {
    const manager = await Manager.findOne({ token });
    if (!manager) throw new Error("Manager does not exist");
    if (manager.main_status !== "inactive")
      throw new Error("Manager is already registered");
    if (
      manager &&
      manager.main_status === "inactive" &&
      mobile === manager.mobile
    ) {
      res.status({ message: "manager verified" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// unfinished: needed continous test(
// check:
// 1. mobile is same as the one saved with token
// 2. change the main status correct way )
// 3. on method make them choose bank and input their bank method
const registerManager = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { mobile } = req.body;
  try {
    const managerExists = await Manager.findOne({ token });
    if (managerExists) {
      console.log("check"); // check if mobile on database with this token is same as they provided
    }
    const manager = await Manager.create({
      fullname,
      email,
      mobile,
      main_status: "waiting",
      shop_info,
      method,
      image,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const loginManager = asyncHandler(async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const manager = await Manager.findOne({ mobile });
    if (!manager) throw new Error("no manager found");
    if (manager && (await manager.isPasswordMatched(password))) {
      const managerToken = await generateRefreshToken(manager?._id);
      const updateToken = await Manager.findOneAndUpdate(
        manager.mobile,
        { managerToken: managerToken },
        { new: true }
      );
    }
    res.cookie("manager", managerToken, {
      httpOnly: true,
      sameSite: "true",
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      message: "Manager logged in successfully",
      _id: manager._id,
      unique_id: manager.unique_id,
      fullname: manager.fullname,
      email: manager.email,
      mobile: manager.mobile,
      status: manager.status,
      main_status: manager.main_status,
      payment: [{ bankName, bankAccount }],
      token: generateToken(manager?._id),
    });
  } catch (error) {
    throw new Error(error);
  }
});
// make sure they don't update location and address and other sensitive
const updateManagerInfo = asyncHandler(async (req, res) => {
  const { id } = req.manager;
  try {
    const manager = await Manager.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(manager);
  } catch (error) {
    throw new Error(error);
  }
});

const changeStatus = asyncHandler(async (req, res) => {
  const { id } = req.manager;
  const { status } = req.body;
  try {
    const manager = await manager.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(manager);
  } catch (error) {
    throw new Error(error);
  }
});

// admin need to authorize deletion
const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.manager;
  try {
    const manager = await manager.findByIdAndDelete(id);
    res.json(manager);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  // verifyManagerToken,
  verifyManager,
  registerManager,
  loginManager,
  updateManagerInfo,
  changeStatus,
  deleteAccount,
};
