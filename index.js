const express = require('express');
require("dotenv").config();




//! Mongoose là thằng trung gian để kết nổi với database
const database = require("./config/database")
database.connect();

const app = express()
const port = process.env.PORT ;

app.set('views', './views');
app.set('view engine', 'pug');

//! File static
app.use(express.static("public"));

//! App local (để pug sử dụng dc)
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