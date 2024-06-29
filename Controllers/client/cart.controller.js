const Cart = require('../../models/carts.model')

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

module.exports = {
    addPOST,
}