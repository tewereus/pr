const Manager = require("../../models/users/managerModel")
const asyncHandler = require("express-async-handler")
// const url = require('url')

const verifyManagerToken = asyncHandler(async(req, res) => {
    const {token} = req.params
    try {
        const manager = await Manager.findOne({token})
        if(!manager) throw new Error(error)
        if(manager.main_status === "inactive"){
            const currentUrl = new URL.parse(req.originalUrl)
            const redirectUrl = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname}/register`
            res.redirect(redirectUrl)
        }
        
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    verifyManagerToken
}