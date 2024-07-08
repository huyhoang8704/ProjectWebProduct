const mongoose = require("mongoose");
const generate = require("../helpers/generate")

const forgotpasswordSchema = new mongoose.Schema(
    {
        email : String,
        otp : String,
        expireAt : {
            type : Date,
            expires : 180,
        }  
    },
    {
        timestamps : true
    }
);


const ForgotPassword = mongoose.model("ForgotPassword",forgotpasswordSchema,"forgot-password") // argu3 là tên connection trong db


module.exports = ForgotPassword;
