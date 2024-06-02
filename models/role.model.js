const mongoose = require("mongoose");

const Roleschema = new mongoose.Schema(
    {
        title: String,
        description: String,
        permissions :{
            type : Array,
            default: [],
        },
        deleted: {
            type : Boolean,
            default: false,
        },
        deletedAt: Date,

    },
    {
        timestamps : true
    }
);


const Role = mongoose.model("Role",Roleschema,"role") // argu3 là tên connection trong db


module.exports = Role;
