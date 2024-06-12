const ProductCategory  =require('../../models/products-category.model')
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")

const index = async (req , res) => {
    res.render('client/pages/home/index.pug' , {
        pageTitle : "Trang chủ",
    }) 
}

module.exports = {
    index,
}