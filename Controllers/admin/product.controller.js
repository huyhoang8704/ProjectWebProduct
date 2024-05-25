const Product = require('../../models/products.model')




//! [GET] /admin/products
const index = async (req , res) => {
    const products = await Product.find({ deleted : "false" })



    res.render('admin/pages/products/index.pug' , {
        pageTitle : "Trang danh sách sản phẩm",
        products : products
    }) 
}

module.exports = {
    index,
}