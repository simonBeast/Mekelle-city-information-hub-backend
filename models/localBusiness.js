const mongoose = require('mongoose');
const LocalBusinessSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:[true,"Please fill the name field"]
    },

    category:{
        type:String,
        required:[true,"Please fill the categoryfield"]
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
module.exports = mongoose.model("LocalBusiness",LocalBusinessSchema)