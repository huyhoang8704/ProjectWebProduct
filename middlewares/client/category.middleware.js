const ProductCategory  =require('../../models/products-category.model')
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")

module.exports.category = async (req, res, next) =>{
    let find = {
        deleted : false,
    }

    const productCategory = await ProductCategory.find(find)
    const newProductCategory = createTreeHelpers.tree(productCategory)

    res.locals.layoutProductCategory = newProductCategory


    next();
} 