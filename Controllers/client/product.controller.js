const Product = require('../../models/products.model')


const index = async (req , res) => {
    const products = await Product.find({
        status : "active",
        deleted : "false",
    });
    // console.log(products)

    // xử lí price new
    products.forEach(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0)
    })
    res.render('client/pages/products/index.pug',{
        pageTitle : "Danh sách sản phẩm",
        products : products,
    }) 
}
const detail = async (req , res) => {
    // const slug = req.params.slug
    // console.log(slug)
    try {
        const find = {
            deleted: false,
            slug : slug
        }
        const product = await Product.findOne(find)
    
    
        res.render('admin/pages/products/detail.pug' , {
            pageTitle : "Trang chi tiết sản phẩm",
            product : product,
        }) 
    } catch (error) {
        res.redirect(`products`)
    }
}




module.exports = {
    index,
    detail,
}