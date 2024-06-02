//!1
const systemConfig = require("../../config/system")


const dashboard = require("./dashboard.route") // import
const products = require("./product.route") // import
const productsCategory = require("./products-category.route")
const roles = require("./role.route")

module.exports = (app) => {
    const PATH = systemConfig.prefixAdmin

    app.use(PATH + "/dashboard", dashboard);
    app.use(PATH + "/products", products);
    app.use(PATH + "/products-category", productsCategory);
    app.use(PATH + "/roles", roles);
}
