const mongoose = require('mongoose');
const CommunityBulletSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:[true,"Please fill the name field"]
    },

    description:{
        type:String,
        required:[true,"Please fill the description field"]
    },

    picture:{
        type:String,
    },
    
    createdAt:{
        type:Date,
        default:new Date(Date.now())
    }
})
module.exports = mongoose.model("CommunityBullet",CommunityBulletSchema)