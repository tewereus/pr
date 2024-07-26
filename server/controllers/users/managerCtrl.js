const Manager = require("../../models/users/managerModel")
const asyncHandler = require("express-async-handler")
// const url = require('url')

const verifyManagerToken = asyncHandler(async(req, res) => {
    const {token} = req.params
    try {
        const manager = await Manager.findOne({token})
        if(!manager) throw new Error(error) // modify this, maybe send to homepage
        if(manager.main_status === "inactive"){
            const currentUrl = new URL.parse(req.originalUrl)
            const redirectUrl = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname}/register`
            res.redirect(redirectUrl)
        }else if(manager.main_status === "active"){
            const currentUrl = new URL.parse(req.originalUrl)
            const redirectUrl = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname}/login` // check if already logged in to goto their hompage instead of login
            res.redirect(redirectUrl)
        }else if(manager.main_status === "unavailable"){
            const currentUrl = new URL.parse(req.originalUrl)
            const redirectUrl = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname}/404-page` // modify this, maybe send to homepage
            res.redirect(redirectUrl)
        }
        
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    verifyManagerToken
}