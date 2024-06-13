const Product = require('../../models/products.model')
const productHelpers = require("../../helpers/product")

const index = async (req , res) => {
    const products = await Product.find({
        status : "active",
        deleted : "false",
    });
    // console.log(products)

    // xử lí price new
    const newProduct = productHelpers.priceNewProduct(products)

    res.render('client/pages/products/index.pug',{
        pageTitle : "Danh sách sản phẩm",
        products : newProduct,
    }) 
}
const detail = async (req , res) => {
    const slug = req.params.slug
    // console.log(slug)
    try {
        const find = {
            deleted: false,
            slug : slug,
            status : "active",
        }
        const product = await Product.findOne(find)
        // console.log(product)
    
        res.render('client/pages/products/detail.pug' , {
            pageTitle : product.title,
            product : product,
        }) 
    } catch (error) {
        res.redirect(`/products`)
    }
}




module.exports = {
    index,
    detail,
}