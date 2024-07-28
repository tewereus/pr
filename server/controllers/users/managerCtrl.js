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
    const {mobile, password} = req.body
    try {
        const manager = await Manager.findOne({mobile})
        if(!manager) throw new Error("Incorrect phone or password")
        if(manager && (await manager.isPasswordMatched(password))){
            const managerToken = await generateRefreshToken(manager?._id);
            const updateToken = await Manager.findOneAndUpdate(
                manager.mobile,
                {managerToken: managerToken},
                {new: true}
            )
        }
        res.cookie("manager", managerToken, {
            httpOnly: true,
            sameSite: "true",
            maxAge: 72*60*60*1000
        })
        res.json({
            message: "Manager logged in successfully",
            _id: manager._id,
            unique_id: manager.unique_id,
            fullname: manager.fullname,
            email: manager.email,
            mobile: manager.mobile,
            status: manager.status,
            main_status: manager.main_status,
            payment: [{bankName, bankAccount}],
            token: generateToken(manager?._id),
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateManagerInfo = asyncHandler(async(req, res) => {
    const {id} = req.manager
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