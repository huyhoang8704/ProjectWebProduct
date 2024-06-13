const Account = require('../../models/accounts.model')
const Role = require('../../models/role.model')
const systemConfig = require("../../config/system")




module.exports.requireAuth = async (req , res, next) => {
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    } else {
        // console.log("Token" , req.cookies.token)
        const user = await Account.findOne({token : req.cookies.token}).select('-password')
        // console.log(user)
        if(!user)         res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        else {
            const role = await Role.findOne({
                _id : user.role_id,
                deleted : false,
            }).select("title permissions")

            res.locals.user = user;   //! locals
            res.locals.role = role;
            next();
        }
    }



}