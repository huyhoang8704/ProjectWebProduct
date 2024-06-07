const mongoose = require("mongoose");
const generate = require("../helpers/generate")

const Account_schema = new mongoose.Schema(
    {
        fullname: String,
        email : String,
        password : String,

        // unique , not public
        token :{
            type: String,
            default: generate.generateRandomString(20),
        },

        phone : String,
        avatar : String,
        role_id : String,
        status : String,


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


const Account = mongoose.model("Account",Account_schema,"accounts") // argu3 là tên connection trong db


module.exports = Account;
