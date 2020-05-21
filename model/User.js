var mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:6,
        max:569,
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:569,
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    created:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User',userSchema);