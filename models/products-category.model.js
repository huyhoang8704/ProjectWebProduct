const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug)


const ProductCategory_schema = new mongoose.Schema(
    {
        title: String,
        parent_id: {        //? New
            type : String,
            default: "",
        },
        slug: { 
            type: String, 
            slug: "title",
            unique: true
        },
        description: String,
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


const ProductCategory = mongoose.model("ProductCategory",ProductCategory_schema,"products-category")


module.exports = ProductCategory;
