const priceNewProduct = (product) => {
    product.forEach(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0)
    })
    return product;
}

module.exports = {
    priceNewProduct,
}