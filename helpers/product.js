const ProductCategory = require('../models/products-category.model')

const priceNewProduct = (product) => {
    product.forEach(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0)
    })
    return product;
}

const priceNewOneProduct = (product) => {
    const priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(0)
    return priceNew;


}
const getSubCategory = async (parentID) =>{
    const getCategory = async (parentID) =>{
        const subs = await ProductCategory.find({
            parent_id: parentID,
            status : "active",
            deleted : false,
        })
        
        let allSub =[...subs];
        for(const sub of subs){
            const childs = await getCategory(sub.id);
            allSub = allSub.concat(childs);
        }
        return allSub;
    }
    const result = await getCategory(parentID)
    return result;
}   


module.exports = {
    priceNewProduct,
    getSubCategory,
    priceNewOneProduct
}