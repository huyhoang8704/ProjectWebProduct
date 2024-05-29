const createPOST = (req , res , next) => {
    if(!req.body.title){
        req.flash('error', 'Vui lòng nhập title');
        res.redirect("back")
        return;
    }
    if(!req.body.price){
        req.flash('error', 'Vui lòng nhập giá');
        res.redirect("back")
        return;
    }
    next();  // middleware
}


module.exports = {
    createPOST,
}