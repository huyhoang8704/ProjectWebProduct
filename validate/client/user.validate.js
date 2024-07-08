const registerPOST = (req , res , next) => {
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

    next();  // middleware
}
const loginPOST = (req , res , next) => {
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

    next();  // middleware
}

const forgotPasswordPOST = (req , res , next) => {
    if(!req.body.email){
        req.flash('error', 'Vui lòng nhập email');
        res.redirect("back")
        return;
    }
    next();
}
const otpPOST = (req , res , next) => {
    if(!req.body.otp){
        req.flash('error', 'Vui lòng nhập mã OTP');
        res.redirect("back")
        return;
    }
    next();
}
const resetPasswordPOST = (req , res , next) => {
    if(!req.body.password){
        req.flash('error', 'Vui lòng nhập mật khẩu mới');
        res.redirect("back")
        return;
    }
    if(!req.body.confirmPassword){
        req.flash('error', 'Vui lòng xác nhận mật khẩu');
        res.redirect("back")
        return;
    }
    if(req.body.confirmPassword != req.body.password ){
        req.flash('error', 'Mật khẩu không trùng khớp!');
        res.redirect("back")
        return;
    }
    

    next();
}




module.exports = {
    registerPOST,
    loginPOST,
    forgotPasswordPOST,
    otpPOST,
    resetPasswordPOST,
}