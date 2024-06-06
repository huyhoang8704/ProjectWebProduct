const ProductCategory  =require('../../models/products-category.model')
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")

//! [GET] /admin/products-category
const index = async (req , res) => {
    let find = {
        deleted : false,
    }

    const records = await ProductCategory.find(find)
    const newRecords = createTreeHelpers.tree(records)


    res.render('admin/pages/products-category/index.pug', {
        pageTitle : "Trang danh sách danh mục sản phẩm",
        records : newRecords
    })
}
//! [GET] /admin/products-category/create
const create = async (req , res) => {
    let find = {
        deleted : false,
    }

    const records = await ProductCategory.find(find)
    const newRecords = createTreeHelpers.tree(records)
    // console.log(newRecords)

    res.render('admin/pages/products-category/create.pug', {
        pageTitle : "Tạo danh mục sản phẩm",
        records : newRecords
    })
}

//! [POST] /admin/products-category/create
const createPOST =  async (req , res) =>{
    if(req.body.position == ""){
        const countProducts = await ProductCategory.countDocuments();
        req.body.position = countProducts + 1;
    }
    else req.body.position = parseInt(req.body.position)

    const product = new ProductCategory(req.body) // tạo vô model
    await product.save(); // lưu vào trong database
    req.flash('success', 'Tạo danh mục sản phẩm thành công!');
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}


//! [GET] /admin/products-category/edit/:id
const edit = async (req , res) => {
    try {
        let find = {
            deleted : false,
            _id : req.params.id
        }
        const product = await ProductCategory.findOne(find)
        // console.log(product)
        // Parent ID
        const records = await ProductCategory.find({
            deleted : false,
        })
        const newRecords = createTreeHelpers.tree(records)

    
        res.render('admin/pages/products-category/edit.pug', {
            pageTitle : "Chỉnh sửa danh mục sản phẩm",
            product : product,
            records : newRecords,
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
}
//! [PATCH] /admin/products-category/edit/:id
const editPatch = async (req , res) => {
    const id = req.params.id
    req.body.position = parseInt(req.body.position)

    try {
        await ProductCategory.updateOne({_id : id}, req.body)
        req.flash('success', 'Cập nhật thành công!');
    } catch (error) {
        req.flash('error', 'Cập nhật thất bại!');
    }
    res.redirect("back")
}
const detail = async (req , res) => {
    try {
        let find = {
            deleted : false,
            _id : req.params.id,
        }

        const product = await ProductCategory.findOne(find);
        res.render('admin/pages/products-category/detail.pug' , {
            pageTitle : product.title,
            product : product,
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}


module.exports = {
    index,
    create,
    createPOST,
    edit,
    editPatch,
    detail,
}