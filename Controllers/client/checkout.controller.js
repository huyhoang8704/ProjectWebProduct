const Cart = require('../../models/carts.model')
const Product = require('../../models/products.model')
const productHelpers = require("../../helpers/product")

const index = async (req , res) => {
    const cartID = req.cookies.cartID   // giỏ hang
    const cart = await Cart.findOne({
        _id : cartID
    })
    if(cart.products.length > 0) {
        for(const item of cart.products) {
            const product = await Product.findOne({
                _id : item.products_id
            })
            const priceNew = productHelpers.priceNewOneProduct(product)
            product.priceNew = priceNew

            item.product = product
            item.totalPrice = item.quantity * priceNew

        }
    }
    cart.totalCart = cart.products.reduce((sum,item) => sum + item.totalPrice,0)
    // console.log(cart)

    res.render('client/pages/checkout/index.pug' , {
        pageTitle : "Đặt hàng",
        cartDetail : cart,
    }) 
}

module.exports = {
    index,
}