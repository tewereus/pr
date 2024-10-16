const Manager = require("../../models/users/managerModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateRefreshToken } = require("../../config/refreshtoken");
const { generateToken } = require("../../config/jwtToken");
const { connect } = require("mongoose");
const Printer = require("../../models/users/printerModel");
const Rider = require("../../models/users/riderModel");

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

//       /Handle based on the manager's main status
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
  console.log(req.body);

  try {
    const manager = await Manager.findOne({ unique_id: token });
    if (!manager) throw new Error("Manager does not exist");
    if (manager && mobile !== manager.mobile)
      throw new Error("Invalid Credentials");
    res.json({
      _id: manager?._id,
      email: manager?.email,
      mobile: manager?.mobile,
      status: manager?.status,
      main_status: manager?.main_status,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// const verifyPassword = asyncHandler(async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;
//   console.log(req.body);

//   try {
//     const manager = await Manager.findOne({ unique_id: token });
//     if (!manager) throw new Error("Manager does not exist");
//     if (manager && (await manager.isPasswordMatched(password))) {
//       res.json({
//         _id: manager?._id,
//         email: manager?.email,
//         mobile: manager?.mobile,
//       });
//     } else {
//       throw new Error("Invalid Credentials");
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const managerInfo = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { fullname, email, password, profile } = req.body;
  try {
    const manager = await Manager.findOne({ unique_id: token });
    if (manager) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const updated = await Manager.findOneAndUpdate(
        { unique_id: token },
        {
          fullname,
          email,
          password: hashedPassword,
          profile,
          main_status: "waiting",
        },
        {
          new: true,
        }
      );
      res.json(updated);
    } else {
      throw new Error("Manager does not exist");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const viewProfile = asyncHandler(async (req, res) => {
  const { id } = req.manager;
  try {
    const manager = await Manager.findById(id);
    res.json(manager);
  } catch (error) {
    throw new Error(error);
  }
});

const loginManager = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const manager = await Manager.findOne({ unique_id: token });
    if (!manager) throw new Error("no manager found");
    // console.log(password);
    // console.log(manager);
    // const check = await bcrypt.compare(password, manager.password);
    // console.log(check);
    if (manager && (await manager.isPasswordMatched(password))) {
      console.log("here");
      const managerToken = await generateRefreshToken(manager?._id);
      const updateToken = await Manager.findOneAndUpdate(
        manager._id,
        { managerToken: managerToken },
        { new: true }
      );

      res.cookie("manager", managerToken, {
        httpOnly: true,
        // sameSite: "true",
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
        preference: manager.preference,
        main_status: manager.main_status,
        // payment: [{ bankName, bankAccount }],
        token: generateToken(manager?._id),
      });
    } else {
      throw new Error("Invalid credentials");
    }
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

const toggleDarkMode = asyncHandler(async (req, res) => {
  const { id } = req.manager;
  const { mode } = req.body.preference;
  try {
    const darkmode = await Manager.findByIdAndUpdate(
      id,
      { "preference.mode": mode },
      {
        new: true,
        runValidators: true, // Optional: Ensure that validators are run
      }
    ).select("preference.mode -_id");
    console.log(darkmode);
    res.json(darkmode);
  } catch (error) {
    throw new Error(error);
  }
});

const addPrinters = asyncHandler(async (req, res) => {
  const { id } = req.manager;
  const { mobile, fullname } = req.body;
  try {
    const printer = await Printer.findOne({ mobile });
    if (printer) throw new Error("printer already exists");
    const manager = await Manager.findById(id).select("-password");
    if (!manager) throw new Error("manager doesn't exists");
    const newPrinter = await Printer.create({
      mobile,
      fullname,
      manager: id,
    });
    const updateManager = await Manager.findByIdAndUpdate(
      id,
      {
        $push: { printers: newPrinter._id },
      },
      { new: true }
    ).select("-password");
    res.json(updateManager);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllPrinters = asyncHandler(async (req, res) => {
  const { id } = req.manager;
  try {
    const printers = await Manager.findById(id).populate({
      path: "printers",
      select: "fullname",
    });
    // .select("printers");
    res.json(printers);
  } catch (error) {
    throw new Error(error);
  }
});

const addRiders = asyncHandler(async (req, res) => {
  const { id } = req.manager;
  const { mobile, fullname } = req.body;
  try {
    const rider = await Rider.findOne({ mobile });
    if (rider) throw new Error("rider already exists");
    const manager = await Manager.findById(id).select("-password");
    if (!manager) throw new Error("manager doesn't exists");
    const newRider = await Rider.create({
      mobile,
      fullname,
      manager: id,
    });
    const updateManager = await Manager.findByIdAndUpdate(
      id,
      {
        $push: { riders: newRider._id },
      },
      { new: true }
    ).select("-password");
    res.json(updateManager);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  // verifyManagerToken,
  verifyManager,
  managerInfo,
  loginManager,
  viewProfile,
  updateManagerInfo,
  changeStatus,
  deleteAccount,
  toggleDarkMode,
  addPrinters,
  getAllPrinters,
  addRiders,
};
