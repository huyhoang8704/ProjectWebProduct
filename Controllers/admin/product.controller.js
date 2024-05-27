const Product = require("../../models/products.model")
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");



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
        sort[req.query.sortKey] = "desc"
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
    const id = req.params.id
    await Product.updateOne(
        {_id : id}, 
        {deleted : "true"},
        {deleteAt : new Date()},
    )
    res.redirect("back")
}


module.exports = {
    index,
    changeStatus,
    deleteItem,
}