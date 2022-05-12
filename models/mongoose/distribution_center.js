const mongoose = require("mongoose");
var Schema = mongoose.Schema;


let dcSchema = new Schema({
    dcName:{
        type: String,
        required: true,
        unique : true 

    },
    dcContact:{
        type: String,
        // required: true,
    },
    Address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    district:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    pinCode:{
        type: String,
        required: true,
        unique: true
    },
    location:{
        long:{
            type: String,
        },
        lat:{
            type: String,
        }
    },
    servingPinCodeList:[{
        type: String,
        required: true
    }],
    dcManager:[{
        type: Schema.Types.ObjectId,
        ref:"users"
    }],
},{
    timestamps: true
})
dcSchema.index({'$**': 'text'});
module.exports = mongoose.model("distribution", dcSchema);