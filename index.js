const express = require('express');
require("dotenv").config();

var methodOverride = require('method-override')
var flash = require('express-flash')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')

// Mongoose là thằng trung gian để kết nổi với database
const database = require("./config/database")
database.connect();

const app = express()
const port = process.env.PORT ;
// method-override
app.use(methodOverride('_method'))
// express-flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash())
// bodyParse 
app.use(bodyParser.urlencoded({ extended: false }))
// pug
app.set('views', './views');
app.set('view engine', 'pug');

// File static
app.use(express.static("public"));

// App local (để pug sử dụng dc)
const systemconfig = require("./config/system")
app.locals.prefixAdmin = systemconfig.prefixAdmin

//! Route
const route_client = require('./routes/client/index.route')
const route_admin = require('./routes/admin/index.route')
route_client(app)
route_admin(app)


app.listen(port , () =>{
    console.log(`App listening on port ${port}`);
})