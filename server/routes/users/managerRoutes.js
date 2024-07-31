const express = require('express')
const router = express.Router()
const {
    verifyManagerToken,
    registerManager,
    loginManager,
    updateManagerInfo,
    changeStatus,
    deleteAccount
} = require("../../controllers/users/managerCtrl")
const {managerAuthMiddleware} = require('../../middlewares/authMiddleware') 

// check if this route is working

router.get("/manager/:token", verifyManagerToken)
router.get("/manager/:token/register-account", registerManager)
router.post("/manager/:token/login", loginManager)
router.put("/manager/:token/update", updateManagerInfo)
router.put("/manager/:token/change-status", changeStatus)
router.delete("/manager/:token/delete-account", deleteAccount)

module.exports = router