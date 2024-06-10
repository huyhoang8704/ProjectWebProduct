//!1
const systemConfig = require("../../config/system")

const authMiddleware = require('../../middlewares/admin/auth.middleware')

const dashboard = require("./dashboard.route") // import
const products = require("./product.route") // import
const productsCategory = require("./products-category.route")
const roles = require("./role.route")
const accounts = require("./accounts.route")
const authentication = require("./auth.route")

module.exports = (app) => {
    const PATH = systemConfig.prefixAdmin

    app.use(PATH + "/dashboard",authMiddleware.requireAuth, dashboard);
    app.use(PATH + "/products",authMiddleware.requireAuth, products);
    app.use(PATH + "/products-category",authMiddleware.requireAuth, productsCategory);
    app.use(PATH + "/roles",authMiddleware.requireAuth, roles);
    app.use(PATH + "/accounts",authMiddleware.requireAuth, accounts);
    app.use(PATH + "/auth", authentication);
}
