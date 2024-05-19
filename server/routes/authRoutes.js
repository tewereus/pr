const express = require("express");
const router = express.Router();
const {
  validateUserRegister,
  registerUser,
  loginUser,
  enableTwoFactorAuth,
  viewProfile,
  updateUser,
  updatePassword,
  deleteAccount,
  forgotPasswordToken,
  resetPassword,
  logout,
} = require("../controllers/authCtrl");
const { authMiddleware, authorize } = require("../middlewares/authMiddleware");

router.post("/validate-user", validateUserRegister);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/enable-two-factor-auth", enableTwoFactorAuth);
router.post("/logout", authMiddleware, logout);

router.get("/profile", authMiddleware, viewProfile);
router.put("/profile", authMiddleware, updateUser);
router.put("/update-password", authMiddleware, updatePassword);
router.delete("/profile/delete-account", authMiddleware, deleteAccount);
router.post("/forgot-password", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
module.exports = router;
