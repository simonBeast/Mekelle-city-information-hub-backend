const mongoose = require('mongoose');
const CityServiceSchema = new mongoose.Schema({
   
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
module.exports = mongoose.model("CityService",CityServiceSchema)