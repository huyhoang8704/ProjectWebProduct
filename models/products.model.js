const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug)


const Product_schema = new mongoose.Schema(
    {
        title: String,
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


const Product = mongoose.model("Product",Product_schema,"products")


module.exports = Product;
