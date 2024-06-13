const ProductCategory  =require('../../models/products-category.model')
const Product  =require('../../models/products.model')
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")
const productHelpers = require("../../helpers/product")

const index = async (req , res) => {
    const productFeatured = await Product.find({
        featured : "1",
        deleted : false,
        status : "active",
    })
    // xử lí price new
    const newProductFeatured = productHelpers.priceNewProduct(productFeatured);
    
    // console.log(productFeatured)
    res.render('client/pages/home/index.pug' , {
        pageTitle : "Trang chủ",
        productFeatured : newProductFeatured,
    }) 
}

module.exports = {
    index,
}