const mongoose = require("mongoose");

const Cartschema = new mongoose.Schema(
    {
        user_id : String,
        products : [
            {
                products_id : String,
                quantity : Number,
            }
        ],
    },
    {
        timestamps : true
    }
);


const Cart = mongoose.model("Cart",Cartschema,"cart") // argu3 là tên connection trong db


module.exports = Cart;
