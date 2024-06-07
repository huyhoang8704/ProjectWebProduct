const Account = require('../../models/accounts.model')
const Role = require('../../models/role.model')
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")




const index = async (req , res) => {
    let find = {
        deleted : false,
    }
    const accounts = await Account.find(find).select("-password -token")

    for(const account of accounts) {
        const role = await Role.findOne({
            _id : account.role_id,
            deleted : false,
        })
        account.role = role   // Thêm trường role
    }
    // console.log(accounts)

    res.render('admin/pages/accounts/index.pug' , {
        pageTitle : "Danh sách tài khoản",
        accounts : accounts
    }) 
}
const create = async (req , res) => {
    const role = await Role.find({deleted : false})
    res.render('admin/pages/accounts/create.pug' , {
        pageTitle : "Tạo tài khoản",
        role : role,
    }) 
}
const createPOST = async (req , res) => {
    const checkEmail = await Account.findOne({
        email : req.body.email,
        deleted : false,
    })

    if (checkEmail) {
        req.flash('error', 'Email đã đăng ký!');
        res.redirect("back")
    } else {
        const account = new Account(req.body)
        await account.save()
        req.flash('success', 'Tạo tài khoản thành công!');
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}


module.exports = {
    index,
    create,
    createPOST,
}