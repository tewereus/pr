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

router.route("/manager/:token")
.get(verifyManagerToken)
.post("/register-account", registerManager)
.post("/login", loginManager)
.put("/update", updateManagerInfo)
.put("/change-status", changeStatus)
.delete("/delete-account", deleteAccount)

module.exports = router