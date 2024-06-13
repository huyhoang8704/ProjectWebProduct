const ProductCategory  =require('../../models/products-category.model')
const Product  =require('../../models/products.model')
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")
const productHelpers = require("../../helpers/product")

const index = async (req , res) => {
    //? Hiển thị ra danh sách sản phẩm nổi bật
    const productFeatured = await Product.find({
        featured : "1",
        deleted : false,
        status : "active",
    })
    // xử lí price new
    const newProductFeatured = productHelpers.priceNewProduct(productFeatured);

    //? Hiển thị ra danh sách sản phẩm mới nhất
    const productsNew = await Product.find({
        deleted : false,
        status : "active",

    }).sort({position : "desc"})
    const newProductNew = productHelpers.priceNewProduct(productFeatured);

    res.render('client/pages/home/index.pug' , {
        pageTitle : "Trang chủ",
        productFeatured : newProductFeatured,
        productsNew : newProductNew,
    }) 
}

module.exports = {
    index,
}