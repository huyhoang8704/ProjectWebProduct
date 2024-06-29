const Cart  =require('../../models/carts.model')
const systemConfig = require("../../config/system")
const createTreeHelpers = require("../../helpers/createTree")

module.exports.cartID = async (req, res, next) =>{
    if(!req.cookies.cartID){
        const cart = new Cart();
        await cart.save();

        res.cookie("cartID", cart.id , {
            expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });
    }
    else {

    }
    next();
} 