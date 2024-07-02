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

module.exports = {
    register,
    registerPOST,
}