const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let otpSchema = new Schema({
    phoneNo:{
        type: String,
        required: true
    },
    otp:{
        type: String,
        require: true
    },
    otpType:{
        type: String,
        require: true
    },
    expiresAt:{
        type: Date,
        expires: 60,
        default: Date.now
    },

})

module.exports = mongoose.model("otp", otpSchema);