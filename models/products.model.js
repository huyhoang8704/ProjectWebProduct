const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug)


const Product_schema = new mongoose.Schema(
    {
        title: String,
        product_category_id :{
            type: String,
            default: "",
        },
        slug: { 
            type: String, 
            slug: "title",
            unique: true
        },
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,    // Images
        status: String,   // active
        position: Number,
        createdBy :{
            account_id : String,
            createdAt : {
                type: Date,
                default: Date.now
            }
        },
        deleted: {
            type : Boolean,
            default: false,
        },
        deletedAt: Date,

    },
    {
        timestamps : true
    }
);


const Product = mongoose.model("Product",Product_schema,"products") // argu3 là tên connection trong db


module.exports = Product;
