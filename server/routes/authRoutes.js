const express = require("express");
const router = express.Router();
const {
  validateUserRegister,
  registerUser,
  loginUser,
  getAllUsers,
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
  logout,
  loginAdmin,
} = require("../controllers/authCtrl");
const { authMiddleware, authorize } = require("../middlewares/authMiddleware");

router.post("/validate-user", validateUserRegister);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/admin-login/517331692", loginAdmin);
router.post("/logout", authMiddleware, logout);

router.get("/profile", authMiddleware, viewProfile);
router.put("/profile", authMiddleware, updateUser);
router.put("/update-password", authMiddleware, updatePassword);
router.delete("/profile/delete-account", authMiddleware, deleteAccount);
router.get("/get-user/:id", authMiddleware, authorize, getaUser);
router.delete("/get-user/:id/delete", authMiddleware, authorize, deleteUser);
router.put("/get-user/:id/block", authMiddleware, authorize, blockUser);
router.put("/get-user/:id/unblock", authMiddleware, authorize, unblockUser);

router.post("/forgot-password", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.delete("/all-users/delete", authMiddleware, authorize, deleteAllUsers);
router.get("/all-users", getAllUsers);

module.exports = router;
