const index = (req , res) => {
    res.render('admin/pages/dashboard/index.pug' , {
        pageTitle : "Trang chủ Admin"
    }) 
}

module.exports = {
    index,
}