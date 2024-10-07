const express = require("express");
const router = express.Router();
const {
  // verifyManagerToken,
  // registerManager,
  loginManager,
  updateManagerInfo,
  changeStatus,
  deleteAccount,
  verifyManager,
  // verifyPassword,
  managerInfo,
  toggleDarkMode,
  addPrinters,
  getAllPrinters,
} = require("../../controllers/users/managerCtrl");
const { managerAuthMiddleware } = require("../../middlewares/authMiddleware");

// check if this route is working

// router.get("/manager/:token", verifyManagerToken)
router.post("/manager/:token", verifyManager);
router.put("/manager/:token/manager-info", managerInfo);
// router.post("/manager/:token/verify-password", verifyPassword);
// router.get("/manager/:token/register-account", registerManager);
router.post("/manager/:token/login", loginManager);

router.put("/manager/:token/update", updateManagerInfo);
router.put("/manager/:token/change-status", changeStatus);
router.delete("/manager/:token/delete-account", deleteAccount);
router.put("/dark-mode", managerAuthMiddleware, toggleDarkMode);
router.post("/add-printers", managerAuthMiddleware, addPrinters);
router.get("/all-printers", managerAuthMiddleware, getAllPrinters);

module.exports = router;
