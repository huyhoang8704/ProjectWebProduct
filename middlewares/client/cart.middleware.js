const Cart  =require('../../models/carts.model')
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")

module.exports.cartID = async (req, res, next) =>{
    if(!req.cookies.cartID){
        const cart = new Cart();
        // console.log(cart)
        await cart.save();

        res.cookie("cartID", cart.id , {
            expires : new Date(Date.now() + 1000 * 60 * 60 * 24),
        });
    }
    else {
        // Khi đã có giỏ hàng
        const cart = await Cart.findOne({
            _id : req.cookies.cartID
        })
        // console.log(cart.products.length)
        cart.totalProduct = cart.products.length

        // public
        res.locals.miniCart = cart; 
    }
    next();

} 