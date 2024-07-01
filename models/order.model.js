const mongoose = require("mongoose");

const Orderschema = new mongoose.Schema(
    {
        // user_id : String,
        cart_id : String,
        userInfo : {
            fullname : String,
            phone : String,
            address : String,
        },
        products : [
            {
                product_id : String,
                quantity : Number,
                price : Number,
                discount : Number,
            }
        ],
    },
    {
        timestamps : true
    }
);


const Order = mongoose.model("Order",Orderschema,"orders") // argu3 là tên connection trong db


module.exports = Order;
