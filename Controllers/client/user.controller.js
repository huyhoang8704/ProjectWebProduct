const User = require('../../models/user.model')
const Forgotpassword = require('../../models/forgot-password.model')

const generate = require('../../helpers/generate')
const sendMailHelper = require('../../helpers/sendEmail')

const register = async (req , res) => {
    res.render('client/pages/user/register.pug' , {
        pageTitle : "Trang đăng ký tài khoản",
    }) 
}
const registerPOST = async (req , res) => {
    // console.log(req.body)
    const existEmail = await User.findOne({
        email : req.body.email,
        deleted : false,
    })
    if(existEmail) {
        req.flash('error', 'Email đã đăng ký!')
        res.redirect('back')
        return
    }
    const user = new User(req.body)
    await user.save()

    res.cookie("tokenUser",user.tokenUser)

    req.flash('success', 'Đăng ký thành công!')
    res.redirect("/")
}
const login = async (req , res) => {
    res.render('client/pages/user/login.pug' , {
        pageTitle : "Trang đăng nhập",
    }) 
}
const loginPOST = async (req , res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({
        email : email,
        deleted : false,
    })
    if(!user) {
        req.flash('error', "Email không tồn tại!")
        res.redirect('back')
        return
    }
    if(password != user.password){
        req.flash('error', "Sai mật khẩu!")
        res.redirect('back')
        return
    }
    if(user.status == "inactive"){
        req.flash('error', "Tài khoản đã bị khóa!")
        res.redirect('back')
        return
    }
    res.cookie("tokenUser" , user.tokenUser)
    req.flash('success', 'Đăng nhận thành công!')
    res.redirect("/")
}
const logout = async (req, res) => {
    res.clearCookie("tokenUser")   // Xóa token
    res.redirect(`/`)
}
const forgotPassword = async (req, res) => {
    res.render('client/pages/user/forgot-password.pug' , {
        pageTitle : "Trang quên mật khẩu",
    }) 
}
const forgotPasswordPOST = async (req, res) => {
    const email = req.body.email

    const user = await User.findOne({
        email : email,
        deleted : false,
    })
    if(!user) {
        req.flash('error', "Email không tồn tại!")
        res.redirect('back')
        return
    }
    // Việc 1 : Tạo mã OTP và lưu OTP, email vào collection forgot-password
    const objectForgotPassword = {
        email : email,
        otp : generate.generateOTP(5),
        expireAt : Date.now(),
    }
    // console.log(objectForgotPassword)
    // Lưu vào database
    const forgotPassword = new Forgotpassword(objectForgotPassword)
    await forgotPassword.save()

    // Việc 2 : Gửi mã OTP qua email của user , vào trang để nhập mã otp
    const subject = "Xác Thực OTP"
    const html = `Xin chào ${user.fullname} <br> Mã xác thực OTP là:</br>  <b>${objectForgotPassword.otp} </b>`
    
    sendMailHelper.sendEmail(email,subject,html);

    res.redirect(`/user/password/otp?email=${email}`)
}
const otpPassword = async (req, res) => {
    const email = req.query.email
    // res.send("OK")
    res.render('client/pages/user/otp-password.pug' , {
        pageTitle : "Xác Thực OTP",
        email : email,
    }) 
}
const otpPasswordPOST = async (req, res) => {
    const email = req.body.email
    const otp = req.body.otp

    const result = await Forgotpassword.findOne({
        email : email,
        otp : otp,
    })

    if(!result) {
        req.flash('error', "OTP không hợp lệ!")
        res.redirect('back')
        return
    }

    const user = await User.findOne({
        email : email,
        deleted : false,
    })

    res.cookie("tokenUser",user.tokenUser)
    res.redirect("/user/password/reset")
}
const resetPassword = async (req, res) => {
    if(req.cookies.tokenUser){
        res.render('client/pages/user/reset-password.pug' , {
            pageTitle: "Reset Password",
        })
    } else {
        res.redirect("/user/login")
    }
}
const resetPasswordPOST = async (req, res) => {
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    const tokenUser = req.cookies.tokenUser

    await User.updateOne({
        tokenUser : tokenUser
    }, {
        password : password,
    })


    req.flash('success', "Đã đổi mật khẩu thành công !")
    res.redirect('/')
}

const informationUser = async (req, res) => {
    res.render('client/pages/user/info.pug' , {
        pageTitle: "Thông tin cá nhân",
    })
}

module.exports = {
    register,
    registerPOST,
    login,
    loginPOST,
    logout,
    forgotPassword,
    forgotPasswordPOST,
    otpPassword,
    otpPasswordPOST,
    resetPassword,
    resetPasswordPOST,
    informationUser,
}