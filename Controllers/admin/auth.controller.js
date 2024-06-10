const Account = require('../../models/accounts.model')
const Role = require('../../models/role.model')
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")




//! [GET] /admin/auth/login
const login = (req , res) => {
    if(req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    } else {
        res.render('admin/pages/auth/login.pug' , {
            pageTitle : "Trang đăng nhập Admin"
        })
    }
}
//! [POST] /admin/auth/login
const loginPOST = async (req , res) => {
    const email = req.body.email
    const password = req.body.password

    user = await Account.findOne({
        email : email,
        deleted : false,
    })
    if(!user) {
        req.flash('error', "Email không tồn tại!")
        res.redirect('back')
        return
    }
    if(password != user.password){
        req.flash('error', "Sai mật khẩu!")
        res.redirect('back')
        return
    }
    if(user.status == "inactive"){
        req.flash('error', "Tài khoản đã bị khóa!")
        res.redirect('back')
        return
    }

    res.cookie("token", user.token) // Dùng để tạo token => authenticate

    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}
const logout = async (req, res) => {
    res.clearCookie("token")   // Xóa token
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}


module.exports = {
    login,
    loginPOST,
    logout
}