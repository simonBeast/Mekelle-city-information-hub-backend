const mongoose = require('mongoose');
const EmergencySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please fill the number field"]
    },
    
   number:{
        type:String,
        required:[true,"Please fill the number field"]
    },

    description:{
        type:String,
        required:[true,"Please fill the description field"]
    },
    createdAt:{
        type:Date,
        default:new Date(Date.now())
    },
})
module.exports = mongoose.model("Emergency",EmergencySchema)