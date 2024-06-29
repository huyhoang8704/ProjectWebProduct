const categoryMiddleware = require('../../middlewares/client/category.middleware')

const productRoutes = require('./product.route')
const homeRoutes = require('./home.route')
const searchRoutes = require('./search.route')

module.exports = (app) => {
    app.use(categoryMiddleware.category)  // middleware dùng cho tất cả router


    app.use('/', homeRoutes)
    app.use('/products', productRoutes);
    app.use('/search', searchRoutes);
}
