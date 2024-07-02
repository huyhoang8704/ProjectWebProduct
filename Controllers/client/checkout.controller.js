const Cart = require('../../models/carts.model')
const Product = require('../../models/products.model')
const Order = require('../../models/order.model')
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
const order = async (req, res) => {
    const cartID = req.cookies.cartID
    const userInfo = req.body

    const cart = await Cart.findOne({
        _id : cartID
    })
    let products = [];

    for (const product of cart.products) {
        const objectProduct =   {
            product_id : product.products_id,
            quantity : product.quantity,
            price : 0,
            discount : 0,
        }
        // console.log(objectProduct)
        const productInfo = await Product.findOne({
            _id : product.products_id
        })
        // console.log(productInfo)
        objectProduct.price = productInfo.price
        objectProduct.discount = productInfo.discountPercentage

        products.push(objectProduct);
    }
    // console.log(products)
    const objectOrder = {
        cart_id : cartID,
        userInfo : userInfo,
        products : products
    }

    const order = new Order(objectOrder)
    await order.save()

    // Do đã đặt hàng rồi nên cập nhật giỏ hàng thành rỗng
    await Cart.updateOne({
        _id : cartID,
    }, {
        products : [],
    })
    res.redirect(`/cart/checkout/success/${order.id}`)
}
const success = async (req, res) => {
    // console.log(req.params.orderId)
    const order = await Order.findOne({
        _id : req.params.orderId,
    })
    for(const product of order.products) {
        const productInfo = await Product.findOne({
            _id : product.product_id
        }).select("title thumbnail")

        product.productInfo = productInfo;

        const priceNew = (product.price * (100 - product.discount) / 100).toFixed(0)
        // console.log(priceNew)
        product.priceNew = priceNew
        product.totalPrice = priceNew * product.quantity;
        // console.log(product)
    }
    order.totalPrice = order.products.reduce((sum,item) => sum + item.totalPrice,0)
     

    res.render('client/pages/checkout/success.pug' , {
        pageTitle : "Đặt hàng thành công",
        order : order,
    }) 
}


module.exports = {
    index,
    order,
    success,
}