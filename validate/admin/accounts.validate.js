const createPOST = (req , res , next) => {
    if(!req.body.fullname){
        req.flash('error', 'Vui lòng nhập họ tên');
        res.redirect("back")
        return;
    }
    if(!req.body.email){
        req.flash('error', 'Vui lòng nhập email');
        res.redirect("back")
        return;
    }
    if(!req.body.password){
        req.flash('error', 'Vui lòng nhập mật khẩu');
        res.redirect("back")
        return;
    }
    if(!req.body.phone){
        req.flash('error', 'Vui lòng nhập số điện thoạt');
        res.redirect("back")
        return;
    }




    next();  // middleware
}


module.exports = {
    createPOST,
}