const User = require("../models/userModel");
const AppExceptions = require("../utils/AppExceptions");
const Filter = require('../utils/filter');
const bcrypt = require('bcrypt');
const authController = require('./authController')
exports.updateUser = async (req,res,next)=>{
    let updatedUser;
    req.body.password = null;
    try{
      updatedUser = await User.findByIdAndUpdate(req.params.id,{email:req.body.email},{new:true});
      res.status(200).json({
        status:"success",
        data:updatedUser
      });
    }catch(e){
        console.log(e);
        return next(e)
    }
}
exports.deleteUser = async (req,res,next)=>{
    let deletedUser;
    try{
        if(req.body.session){
          deletedUser = await User.findByIdAndDelete(req.params.id,{session: req.body.session});
        }
        else{
          deletedUser = await User.findByIdAndDelete(req.params.id);
        }
        res.status(200).json({
        status:"Success",
        data:deletedUser
      });
    }catch(e){
        console.log(e);
        return next(new AppExceptions(e,500));
    }
}
exports.getAllUsers = async (req,res,next)=>{
    let foundUsers;
    try{
      foundUsers = User.find();
      let filter = new Filter(foundUsers,req.query).filter().limitFields().sort().paginate().query;
      foundUsers = await filter;
      res.status(200).json({
        status:"Success",
        data:foundUsers
      });
    }catch(e){
        console.log(e);
        return next(new AppExceptions(e,500))
    }
}
exports.getUser = async (req,res,next)=>{
    let foundUser;
    try{
      foundUser = await User.findById(req.params.id);
      if(!foundUser){
        return next(new AppExceptions("No User was found by this Id",500))
      }
      res.status(200).json({
        status:"success",
        data:foundUser
      });
    }catch(e){
        return next(e);
    }
}
exports.changePassword = async (req,res,next)=>{
  const foundUser = await User.findById(req.params.id).select('+password');
  if(!foundUser){
    return next(new AppExceptions(`No user by this Id { ${req.params.id} }`,404));
  }
  console.log(req.body.oldPassword,foundUser.password)
  if(!(await bcrypt.compare(req.body.oldPassword,foundUser.password))){
    return next("your old password is incorrect please enter the password correctly");
  }
      foundUser.password = req.body.password;
      foundUser.passwordConfirm = req.body.passwordConfirm;
      
      try{
        await foundUser.save();
        return authController.createAndSendToken(foundUser,200,res);
      }catch(e){
        return next(e);
      }
      
   
    
}