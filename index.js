const express = require('express');
require("dotenv").config();

var methodOverride = require('method-override')
var flash = require('express-flash')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var path = require('path')
var moment = require('moment')   // convert Date

// Mongoose là thằng trung gian để kết nổi với database
const database = require("./config/database")
database.connect();

const app = express()
const port = process.env.PORT ;
// method-override
app.use(methodOverride('_method'))
// express-flash  // thông báo
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash())
// TinyMCE  : tạo phông chữ cho description
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// bodyParse req.body
app.use(bodyParser.urlencoded({ extended: false }))
// pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// File static
app.use(express.static(`${__dirname}/public`));

// App local (để pug sử dụng dc)
const systemconfig = require("./config/system")
app.locals.prefixAdmin = systemconfig.prefixAdmin
app.locals.moment = systemconfig.moment


//! Route
const route_client = require('./routes/client/index.route')
const route_admin = require('./routes/admin/index.route')
route_client(app)
route_admin(app)

// Trang 404
app.get("*", (req, res) => {
    res.render("client/pages/errors/404.pug", {
        pageTitle : "404 Not Found",
    })
})



app.listen(port , () =>{
    console.log(`App listening on port ${port}`);
})