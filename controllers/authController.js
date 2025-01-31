const user = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const AppExceptions = require('../utils/AppExceptions');
const sendMail = require('../utils/email');

exports.login = async (req,res,next)=>{
    let foundUser =  user.findOne({email:req.body.email});
    let foundUserWOP = await foundUser.select("-company -createdAt -__v");
    let foundUserWP = await user.findOne({email:req.body.email}).select("+password")
    if(!foundUserWP){
        return next(new AppExceptions("Email or password incorrect",401))
    }
    if(await bcrypt.compare(req.body.password,foundUserWP.password)){
       this.createAndSendTokenAndUser(foundUserWOP,200,res);
      
    }else{
        return next(new AppExceptions("Email or password incorrect",401))
    }
    
}

exports.signUp = async (req,res,next)=>{
    let newUser;
    try {
        newUser = await user.create({
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                passwordConfirm: req.body.passwordConfirm
            })    
            res.status(201).json({
                status:"success",
                user:newUser
            })    

    }catch(err){
        console.log(err);
        return next(new AppExceptions(err,401))
    }

 
}
    

exports.jwtSign = (payload)=>{
   const token =  jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_IN
       })
    return token
}

exports.createAndSendToken = (user,statusCode,res)=>{
    const token = this.jwtSign({id:user._id});
    res.status(statusCode).json({
        status:"success",
        token
    })
}
exports.createAndSendTokenAndUser = (user,statusCode,res)=>{
    console.log(user);
    const token = this.jwtSign({id:user._id});
    res.status(statusCode).json({
        status:"success",
        token,
        user
    })
}

exports.forgotPassword = async (req,res,next)=>{
const foundUser = await user.findOne({email:req.body.email});
if(!foundUser){
    return next(new AppExceptions("Email not found",404));
}
const randToken = foundUser.createPasswordResetToken();
    try{
        await foundUser.save({ validateBeforeSave:false });
        const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${randToken}`;
        const message = `Email verification step for resetting Password ---> 
        please click on the below link if you forgot your password if you didn't please ignore this `
        const options = {
            email:foundUser.email,
            subject:"Your password reset Token that is only valid for 10min",
            message: message+" \n "+ resetUrl,
        }
        await sendMail(options);
        res.status(200).json({
            status: "Success",
            message: "Token Sent to email"
        })
    }catch(e){
        foundUser.passwordResetToken = undefined;
        foundUser.passwordResetExpires = undefined;
        await foundUser.save({validateBeforeSave:false})
        console.log(e);
        return next(new AppExceptions(e,500));
    }

}
exports.resetPassword = async (req,res,next)=>{
    let token = req.params.resetToken;
    token = crypto.createHash('sha256').update(token).digest('hex');
    const foundUser = await user.findOne({passwordResetToken:token,passwordResetExpires:{$gt:Date.now()}});
    if(!foundUser){
        return next(new AppExceptions("invalid reset Token or the token has expired",404));
    }
    foundUser.password = req.body.password;
    foundUser.passwordConfirm = req.body.passwordConfirm;
    foundUser.passwordResetExpires = undefined;
    foundUser.passwordResetToken = undefined;
    await foundUser.save();
    return this.createAndSendToken(foundUser,200,res);
}