const Account = require('../../models/accounts.model')
const Role = require('../../models/role.model')
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")



const index = (req , res) => {
    res.render('admin/pages/my-account/index.pug' , {
        pageTitle : "Thông tin cá nhân"
    }) 
}

const edit = async (req , res) => {
    res.render('admin/pages/my-account/edit.pug' , {
        pageTitle : "Chỉnh sửa thông tin cá nhân"
    })
}
const editPatch = async (req , res) => {
    const id = res.locals.user.id
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
    // console.log(req.body)
    res.redirect("back")

}


module.exports = {
    index,
    edit,
    editPatch,
}