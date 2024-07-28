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
            const redirectUrl = `${currentUrl.protocol}//${currentUrl.host}/404-page` // modify this, maybe send to homepage
            res.redirect(redirectUrl)
        }
        
    } catch (error) {
        throw new Error(error)
    }
})

// unfinished: needed continous test(
// check: 
// 1. mobile is same as the one saved with token 
// 2. change the main status correct way )
// 3. on method make them choose bank and input their bank method 
const registerManager = asyncHandler(async(req, res) => {
    const {token} = req.params
    const {mobile} = req.body
    try {
        const managerExists = await Manager.findOne({token})
        if(managerExists){
            console.log("check") // check if mobile on database with this token is same as they provided
        }
        const manager = await Manager.create({
            fullname,
            email,
            mobile,
            main_status: "waiting",
            shop_info,
            method,
            image,
        })

    } catch (error) {
        throw new Error(error)
    }
})


const loginManager = asyncHandler(async(req, res) => {
    
})

const updateManagerInfo = asyncHandler(async(req, res) => {
    
})

const changeStatus = asyncHandler(async(req, res) => {
    
})

// admin need to authorize deletion
const deleteAccount = asyncHandler(async(req, res) => {

})

module.exports = {
    verifyManagerToken,
    registerManager,
    loginManager,
    updateManagerInfo,
    changeStatus,
    deleteAccount
}