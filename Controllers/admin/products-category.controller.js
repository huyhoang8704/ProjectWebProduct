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

module.exports = {
    index,
    create,
    createPOST,
}