const Product = require('../../models/products.model')
const ProductCategory = require('../../models/products-category.model')

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
        if(product.product_category_id){
            const category = await ProductCategory.findOne({
                _id : product.product_category_id,
                deleted : false,
                status : "active",
            })
            product.category = category;
        }
        product.priceNew = parseInt((product.price * (100 - product.discountPercentage) / 100).toFixed(0))

        res.render('client/pages/products/detail.pug' , {
            pageTitle : product.title,
            product : product,
        }) 
    } catch (error) {
        res.redirect(`/products`)
    }
}
const category = async (req , res) => {
    const slug = req.params.slug
    // console.log(slug)
    try {
        const category = await ProductCategory.findOne({
            slug : slug,
            deleted : false,
            status : "active",
        })
        const listSubCategory = await productHelpers.getSubCategory(category.id)  // Lấy ra các id con đệ quy
        const listSubCategoryID = listSubCategory.map(item => item.id); // lấy các ID 


        const products = await Product.find({
            deleted : false,
            status : "active",
            product_category_id : {
                $in : [
                    category.id,
                    ...listSubCategoryID
                ]
            }
        })
    
        res.render('client/pages/products/index.pug' , {
            pageTitle : category.title,
            product : products,
        }) 
    } catch (error) {
        res.redirect(`/products`)
    }
}



module.exports = {
    index,
    detail,
    category,
}