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
    // Search
    const keyword = searchHelpers(req , find)
    // Pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelpers(
        {
            currentPage : 1 ,
            limitItem : 6
        },
        req.query,
        countProducts
    )


    if(req.query.status) find.status = req.query.status
    const products = await Product.find(find)



    res.render('admin/pages/products/index.pug' , {
        pageTitle : "Trang danh sách sản phẩm",
        products : products,
        filterStatus : filterStatus,
        keyword : keyword,
    }) 
}

module.exports = {
    index,
}