const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please fill the name field"]
    },

    description:{
        type:String,
        required:[true,"Please fill the description field"]
    },

    date: {
        type: Date,
    },

    picture:{
        type:String,
    },

    createdAt:{
        type:Date,
        default:new Date(Date.now())
    }
})
module.exports = mongoose.model("Event",EventSchema)