// in updateUser make it so that email can be updated by sending otp and mobile by message
// in updateUser it should follow the rules of the user schema like usernam should have minlength of 3 and mobile should be 9 digits long...
// (!Solved! but check again) problem with validateUser as it validates everything not just the one i want to update, like if i change username it also checks for mobile, email..., 


const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongoDbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const validateUser = require("../middlewares/validateUser")
const bcrypt = require("bcryptjs")
const sendEmail = require("./emailCtrl")
const crypto = require("crypto")

const registerUser = asyncHandler(async (req, res) => {
    const {email} = req.body
    const userExists = await User.findOne({email: email})
    if(!userExists){
        const newUser = await User.create(req.body)
        console.log(newUser)
        res.json(newUser)
    }
    else{
        throw new Error("Email already exists")
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const findUser = await User.findOne({email})
    if(findUser && (await findUser.isPasswordMatched(password))){
        const refreshToken = await generateRefreshToken(findUser?._id)
        const updateUser = await User.findByIdAndUpdate(findUser.id, {refreshToken: refreshToken}, {new:true})
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({message: "user logged in successfully",
            _id: findUser?._id,
         name: findUser?.name,
         email: findUser?.email,
         mobile: findUser?.mobile,
         role: findUser?.role,
         isBlocked: findUser?.isBlocked,
         address: findUser?.address,
         token: generateToken(findUser?._id),
        })
    }else{
        throw new Error('Incorrect email or password')
    }
})


const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
       res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
       });
       return res.sendStatus(204); // forbidden
    }
    user.refreshToken = ""
    await user.save()

    res.clearCookie("refreshToken", {
       httpOnly: true,
       sameSite: "None",
       secure: true,
    });
    // Remove the token from headers.authorization
    if (req.headers.authorization) {
        req.headers.authorization = ''; // Clear the Authorization header
    }
    res.sendStatus(204); // forbidden
 });


const viewProfile = asyncHandler(async(req,res)=>{
    const {id} = req.user
    try{
        const user = await User.findById(id).select("-password")
        res.json(user)
    }catch(error){
        throw new Error(error)
    }
})

const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
 
    try {
       const getaUser = await User.findById(id);
       res.json({
          getaUser,
       });
    } catch (error) {
       throw new Error(error);
    }
 });

const updateUser = asyncHandler(async(req,res) => {
    const {id} = req.user
    validateMongoDbId(id);

    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Exclude the password field from the req.body object
    const { password, ...updateData } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, updateData, {new: true})

        // Validate the updated user data against the user schema
        const { error } = validateUser(user);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        res.json({
            message: "User updated successfully",
            user
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updatePassword = asyncHandler(async(req, res) => {
    const {id} = req.user
    const {password} = req.body
    validateMongoDbId(id)

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const user = await User.findByIdAndUpdate(id, {password: hashedPassword}, {new:true})
        res.json(user)
    } catch (error) {
        throw new Error(error)
    }
})

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
 
    try {
       const blockUser = await User.findByIdAndUpdate(id, {
        isBlocked: true
       },{
        new: true
       });
       res.json({
            message:"user blocked successfully",
            blockUser,
       });
    } catch (error) {
       throw new Error(error);
    }
 });

 const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
 
    try {
       const unblockUser = await User.findByIdAndUpdate(id, {
        isBlocked: false
       },{
        new: true
       });
       res.json({
            message:"user unblocked successfully",
            unblockUser,
       });
    } catch (error) {
       throw new Error(error);
    }
 });

const deleteAccount = asyncHandler(async(req,res)=>{
    const {id} = req.user
    try {
        const user = await User.findByIdAndDelete(id)
        res.json({
            message:"Account deleted successfully",
            user,
       });
    } catch (error) {
        throw new Error(error)
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
 
    try {
       const deleteUser = await User.findByIdAndDelete(id);
       res.json({
            message:"user deleted successfully",
            deleteUser,
       });
    } catch (error) {
       throw new Error(error);
    }
 });

 const deleteAllUsers = asyncHandler(async (req, res) => {
    try {
       const deleteUser = await User.deleteMany({role: 'user'})
       res.json({
            message:"All users deleted successfully",
            deleteUser,
       });
    } catch (error) {
       throw new Error(error);
    }
 });

const getAllUsers = asyncHandler(async(req,res)=>{
    try{
        const users = await User.find({role: 'user'})
        res.json(users)
    }catch(err){
        throw new Error(err)
    }
})

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("No user found");
    try {
      const token = await user.createResetPasswordToken();
      await user.save();
      const resetUrl = `Hi please follow this link to reset your password. This link is valid for 10 minutes from now <a href='http://localhost:5000/api/v1/user/reset-password/${token}'>Click Here</a>`;
      const data = {
        to: email,
        subject: "Forgot password Link",
        text: "Hey user",
        htm: resetUrl,
      };
      sendEmail(data);
      res.json(token);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Token Expired, please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
  });
   

module.exports = {
    registerUser,
    loginUser,
    logout,
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
    getAllUsers
}
