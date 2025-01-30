const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please enter your email. sir"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please fill the password field"],
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,"Please confirm your password"],
        validate:{
            validator: function(el){
                return this.password == el;
            },
            message:"The passwords you entered are not the same" 
        }
             
    },
    role:{
        type:String,
        enum:{
           values:["USER","ADMIN"] ,
           message:"Role should be USER OR ADMIN"
        },
        default: "USER",
    },
    createdAt:{
        type:Date,
        default:new Date(Date.now())
    },
    passwordChangedAt:{
        type:Date
    },
    passwordResetToken:String,
    passwordResetExpires:Date
})
userSchema.pre('save',async function (next){
   if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,await bcrypt.genSalt());
    this.passwordConfirm = undefined;
    next();
});
userSchema.pre('save',function(next){
    if(!this.isModified('password') || this.isNew)
    {return next();}
    this.passwordChangedAt = Date.now() - 1000;
    next();
})
userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){
    let changedTimeStamp;
    if(this.passwordChangedAt){
        changedTimeStamp = parseInt(this.passwordChangedAt.getTime(),10) / 1000;
    }
    return changedTimeStamp > JWTTimeStamp;
}
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
} 
module.exports = mongoose.model("User",userSchema);