const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const authMiddleware = asyncHandler(async(req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
        try {
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                const user = await User.findById(decoded?.id).select("-password");
                console.log(user)
                req.user = user
                next()
            }
        } catch (error) {
            throw new Error("Authorized token expired, please login again")
        }
    }else{
        throw new Error("Not Authorized, No Token")
    }
})

const authorize = asyncHandler(async(req, res, next) => {
    const {email} = req.user
    const adminUser = await User.findOne({email})
    if(adminUser.role !== "admin"){
        throw new Error("You are not admin")
    }else{
        next()
    }
})

module.exports = {authMiddleware, authorize}