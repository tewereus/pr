const express = require('express')
const router = express.Router()
const {verifyManagerToken} = require("../../controllers/users/managerCtrl")

router.get("/manager/:token", verifyManagerToken)

module.exports = router