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
const edit = async (req , res) => {
    try {
        let find = {
            deleted : false,
            _id : req.params.id
        }
        const data = await Account.findOne(find)
        const role = await Role.find({deleted : false})
        res.render('admin/pages/accounts/edit.pug' , {
            pageTitle : "Chỉnh sửa tài khoản",
            data : data,
            role : role,
        })
    }
    catch (error) {

    }
}

const editPatch = async (req , res) => {
    const id = req.params.id
    const checkEmail = await Account.findOne({
        _id : { $ne : id},
        email : req.body.email,
        deleted : false,
    })   // tìm email ngoại trừ nó

    if (checkEmail) {
        req.flash('error', `Email ${req.body.email} đã tồn tại, vui lòng đặt email khác`);
    } else {

        try {
            await Account.updateOne({_id : id}, req.body)
            req.flash('success', 'Cập nhật thành công!');
        } catch (error) {
            req.flash('error', 'Cập nhật thất bại!');
        }
    }
    res.redirect("back")

}

module.exports = {
    index,
    create,
    createPOST,
    edit,
    editPatch,
}