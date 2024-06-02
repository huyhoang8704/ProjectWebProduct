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
const edit = async (req , res) => {
    try {
        let find = {
            deleted : false,
            _id : req.params.id
        }
    
        const role = await Role.findOne(find)
    
    
        res.render('admin/pages/roles/edit.pug' , {
            pageTitle : "Chỉnh sửa nhóm quyền",
            role : role
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
    
}
const editPatch = async (req , res) => {
    const id = req.params.id
    try {
        await Role.updateOne({_id : id}, req.body)
        req.flash('success', 'Cập nhật thành công!');
    } catch (error) {
        req.flash('error', 'Cập nhật thất bại!');
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