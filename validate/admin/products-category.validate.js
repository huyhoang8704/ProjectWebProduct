module.exports.createPOST = (req , res , next) => {
    if(!req.body.title){
        req.flash('error', 'Vui lòng nhập title');
        res.redirect("back")
        return;
    }
    next();  // middleware
}


