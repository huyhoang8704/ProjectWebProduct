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
    //! Middleware dùng cho tất cả routes
    app.use(categoryMiddleware.category)  
    app.use(cartMiddleware.cartID)        // Middleware dùng để lấy ra thông tin giỏ hàng khi có cookies của user
    app.use(userMiddleware.infoUser)      // Middleware dùng để lấy ra thông tin của user khi có cookies

    app.use('/', homeRoutes)
    app.use('/products', productRoutes);
    app.use('/search', searchRoutes);
    app.use('/cart', cartRoutes);
    app.use('/cart/checkout', checkoutRoutes);
    app.use('/user', userRoutes);
}
