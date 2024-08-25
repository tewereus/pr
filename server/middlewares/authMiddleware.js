// const User = require("../models/users/userModel")
// const asyncHandler = require("express-async-handler")
// const jwt = require("jsonwebtoken")

// const authMiddleware = asyncHandler(async(req, res, next) => {
//     let token;
//     if(req?.headers?.authorization?.startsWith('Bearer')){
//         token = req.headers.authorization.split(" ")[1];
//         try {
//             if(token){
//                 const decoded = jwt.verify(token, process.env.JWT_SECRET)
//                 const user = await User.findById(decoded?.id).select("-password");
//                 console.log(user)
//                 req.user = user
//                 next()
//             }
//         } catch (error) {
//             throw new Error("Authorized token expired, please login again")
//         }
//     }else{
//         throw new Error("Not Authorized, No Token")
//     }
// })

// const authorize = asyncHandler(async(req, res, next) => {
//     const {email} = req.user
//     const adminUser = await User.findOne({email})
//     if(adminUser.role !== "admin"){
//         throw new Error("You are not admin")
//     }else{
//         next()
//     }
// })

// module.exports = {authMiddleware, authorize}

const User = require("../models/users/userModel");
const Admin = require("../models/users/adminModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Manager = require("../models/users/managerModel");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract the token from the authorization header
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Retrieve the user based on the decoded token
        const user = await User.findById(decoded.id).select("-password");
        if (user) {
          req.user = user;
          next(); // Continue to the next middleware or route handler
        } else {
          throw new Error("User not found with the provided token");
        }
      } else {
        throw new Error("No token provided in the authorization header");
      }
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  } else {
    throw new Error("Authorization header with Bearer token is required");
  }
});

const adminAuthMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract the token from the authorization header
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Retrieve the user based on the decoded token
        const user = await Admin.findById(decoded.id).select("-password");
        if (user) {
          req.admin = user;
          next(); // Continue to the next middleware or route handler
        } else {
          throw new Error("User not found with the provided token");
        }
      } else {
        throw new Error("No token provided in the authorization header");
      }
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  } else {
    throw new Error("Authorization header with Bearer token is required");
  }
});

const managerAuthMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract the token from the authorization header
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Retrieve the user based on the decoded token
        const user = await Manager.findById(decoded.id).select("-password");
        if (user) {
          req.user = user;
          next(); // Continue to the next middleware or route handler
        } else {
          throw new Error("User not found with the provided token");
        }
      } else {
        throw new Error("No token provided in the authorization header");
      }
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  } else {
    throw new Error("Authorization header with Bearer token is required");
  }
});

// remove this as it is not needed
const authorize = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "administraator") {
    throw new Error("You are not authorized as an admin");
  } else {
    next(); // Continue to the next middleware or route handler
  }
});

module.exports = {
  authMiddleware,
  adminAuthMiddleware,
  managerAuthMiddleware,
  authorize,
};
