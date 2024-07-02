const User = require('../../models/user.model')

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

module.exports = {
    register,
    registerPOST,
    login,
    loginPOST,
}