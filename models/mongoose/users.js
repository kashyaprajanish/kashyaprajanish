const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let userSchema = new Schema({
    name:{
        firstName:{
            type: String,
            required: true,
            default : null 
        },
        lastName:{
            type: String,
            required: true,
            default : null 
        },
    },
    email:{
        type: String,
    },
    role:{
        type: String,
        required: true,
    },
    phoneNo:{
        type: String,
        required: true,
        // unique : true 
    },
    password:{
        type: String,
        required: true
    },
    deviceId:{
        type: String,
    },
    isActive:{
        type:Boolean,
        default: true
    },
    dcAttached:[{
        type: Schema.Types.ObjectId,
        ref:"distribution"
    }],
    location:{
        long:{
            type: String,
        },
        lat:{
            type: String,
        }
    },
    userAddress:[{

        fullAddress:{
            type: String
        },
        city:{
            type: String
        },
        state: {
            type: String
        },
        pin:{
            type: String
        }
    }],

},{
    timestamps: true
})

module.exports = mongoose.model("users", userSchema);