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
    const records = await Role.find(find)

    res.render('admin/pages/roles/index.pug' , {
        pageTitle : "Nhóm quyền",
        records : records
    }) 
}
const create = async (req , res) => {
    res.render('admin/pages/roles/create.pug' , {
        pageTitle : "Tạo nhóm quyền",
    }) 
}
const createPOST = async (req , res) => {
    try {
        const role = new Role(req.body)
        await role.save()
        req.flash('success', 'Tạo nhóm quyền thành công!');
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    } catch (error) {
        req.flash('error', 'Tạo nhóm quyền thất bại!');
    }
}



module.exports = {
    index,
    create,
    createPOST
}