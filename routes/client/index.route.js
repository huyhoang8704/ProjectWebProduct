const categoryMiddleware = require('../../middlewares/client/category.middleware')
const cartMiddleware = require('../../middlewares/client/cart.middleware')
const userMiddleware = require('../../middlewares/client/user.middleware')
const settingMiddleware = require('../../middlewares/client/setting.middleware')

const productRoutes = require('./product.route')
const homeRoutes = require('./home.route')
const searchRoutes = require('./search.route')
const cartRoutes = require('./cart.route')
const checkoutRoutes = require('./checkout.route')
const userRoutes = require('./user.route')



module.exports = (app) => {
    app.use(categoryMiddleware.category)  // middleware dùng cho tất cả router
    app.use(cartMiddleware.cartID)
    app.use(userMiddleware.infoUser)  

    app.use('/', homeRoutes)
    app.use('/products', productRoutes);
    app.use('/search', searchRoutes);
    app.use('/cart', cartRoutes);
    app.use('/cart/checkout', checkoutRoutes);
    app.use('/user', userRoutes);
}
