
const Product = require('../../models/products.model')
const ProductCategory = require('../../models/products-category.model')

const productHelpers = require("../../helpers/product")


let newProduct = [];
const index = async (req , res) => {
    let keyword = req.query.keyword
    if(keyword){
        const regex = new RegExp(keyword , "i")
        const products = await Product.find({
            deleted : "false",
            status : "active",
            title : regex
        })
        // xử lí price new
        newProduct = productHelpers.priceNewProduct(products)
    }
    console.log(newProduct)

    res.render('client/pages/search/index.pug',{
        pageTitle : "Kết quả tìm kiếm",
        keyword : keyword,
        products : newProduct,
    }) 
}




module.exports = {
    index,
}