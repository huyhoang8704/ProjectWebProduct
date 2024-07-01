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


    res.render('client/pages/cart/index.pug' , {
        pageTitle : "Giỏ hàng",
        cartDetail : cart,

    }) 
}





const addPOST = async (req , res) => {
    const cartId = req.cookies.cartID   // giỏ hàng
    const productId = req.params.productId  // sản phẩm muốn mua
    const quantity = parseInt(req.body.quantity);

    // Kiểm tra xem có sản phẩm đó chưa
    const cart = await Cart.findOne({
        _id : cartId
    })
    const existProduct = cart.products.find(item => item.products_id == productId)
    // Nếu đã tồn tại thì cập nhật quantity
    if(existProduct){
        existProduct.quantity += quantity ;
        // How to update values in array of objects
        await Cart.updateOne(
            {
                _id : cartId,
                'products.products_id' : productId,
            },
            {
                'products.$.quantity': existProduct.quantity
            }
        )
    }
    // Nếu không thì tạo một sản phẩm mới
    else {
        const objectCart = {
            products_id : productId,
            quantity : quantity
        }
    
        // Lưu vào database
        await Cart.updateOne(
            {_id : cartId}, 
            {
                $push : {products : objectCart}
            }
        )
    }

    req.flash("success" , "Đã thêm sản phẩm vào giỏ hàng")
    res.redirect("back")
}
const deleteProduct = async (req , res) => {
    // console.log(req.params.productId)
    
    // How to delete values of array in object using mongoose
    const cartID = req.cookies.cartID
    const productId = req.params.productId

    await Cart.updateOne({
        _id : cartID
    }, {
        "$pull" : {
            products : {
                "products_id" : productId
            }
        }
    })


    req.flash("success", "Xóa sản phẩm thành công")
    res.redirect("back")
}
const update = async (req , res) => {
    const cartID = req.cookies.cartID
    const productId = req.params.productId
    const quantity = req.params.quantity


    await Cart.updateOne(
        {
            _id : cartId,
            'products.products_id' : productId,
        },
        {
            'products.$.quantity': quantity
        }
    )


    req.flash("success", "Cập nhật số lượng thành công!")
    res.redirect("back")
}

module.exports = {
    index,
    addPOST,
    deleteProduct,
    update,
}