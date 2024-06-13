const Product = require("../../models/products.model")
const ProductCategory  =require('../../models/products-category.model')
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")

//! [GET] /admin/products
const index = async (req , res) => {
    const find ={
        deleted : "false"
    }
    // FilterStatus
    const filterStatus = filterStatusHelpers(req);
    if(req.query.status) find.status = req.query.status
    // Search
    const keyword = searchHelpers(req , find)
    // Pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelpers(
        {
            currentPage : 1 ,
            limitItem : 4
        },
        req.query,
        countProducts
    )

    // sort
    let sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    } else {
        sort.position = "desc"
    }

    const products = await Product
        .find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)  // Lấy ra số sản phẩm
        .skip((objectPagination.currentPage-1)* objectPagination.limitItem) // pagination

    res.render('admin/pages/products/index.pug' , {
        pageTitle : "Trang danh sách sản phẩm",
        products : products,
        filterStatus : filterStatus,
        keyword : keyword,
        pagination : objectPagination,
    }) 
}
//! [GET] /admin/products/change-status/:status/:id
//http://localhost:3000/admin/products/change-status/active/1 => req.params
const changeStatus = async (req , res) =>{
    const status = req.params.status    // active
    const id = req.params.id            // 1

    await Product.updateOne({_id : id} , {status : status})
    
    req.flash('success', 'Cập nhật trạng thái thành công!');
    res.redirect("back")
}
//! [DELETE] /admin/products/delete/:id
const deleteItem = async (req , res)  => {
    const permissions = res.locals.role.permissions
    if (permissions.includes("products_delete") ) {
        const id = req.params.id
        await Product.updateOne(
            {_id : id}, 
            {deleted : "true"},
            {deleteAt : new Date()},
        )
        res.redirect("back")
    } else {
        res.send("403");
        return;
    }

}

//! [GET] /admin/products/create
const create = async (req , res) => {
    let find = {
        deleted : false,
    }

    const records = await ProductCategory.find(find)
    const newRecords = createTreeHelpers.tree(records)



    res.render('admin/pages/products/create.pug' , {
        pageTitle : "Trang tạo sản phẩm",
        category : newRecords,
    }) 
}
//! [POST] /admin/products/create
const createPOST = async (req , res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if(req.body.position == '') {
        req.body.position = await Product.countDocuments() + 1;
    } else {
        req.body.position = parseInt(req.body.position)
    }
    // history create data
    req.body.createdBy ={
        account_id : res.locals.user.id,
    }


    const product = new Product(req.body)
    await product.save();
    req.flash('success', 'Tạo sản phẩm thành công!');
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}
//! [GET] /admin/products/edit
const edit = async (req , res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find)
        const records = await ProductCategory.find({
            deleted : false,
        })
        const newRecords = createTreeHelpers.tree(records)
    


        res.render('admin/pages/products/edit.pug' , {
            pageTitle : "Trang chỉnh sửa sản phẩm",
            product : product,
            category : newRecords,
        }) 
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}
//! [PATCH] /admin/products/edit
const editPatch = async (req , res) => {
    const id = req.params.id
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)

    try {
        await Product.updateOne({_id : id}, req.body)
        req.flash('success', 'Cập nhật thành công!');
    } catch (error) {
        req.flash('error', 'Cập nhật thất bại!');
    }
    res.redirect("back")
}

//! [GET] /admin/products/detail
const detail = async (req , res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find)
    
    
        res.render('admin/pages/products/detail.pug' , {
            pageTitle : product.title,
            product : product,
        }) 
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}




module.exports = {
    index,
    changeStatus,
    deleteItem,
    create,
    createPOST,
    edit,
    editPatch,
    detail,
}