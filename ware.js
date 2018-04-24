/**
 * Created by lenovo on 2017/4/9.
 */
exports.checkLogin=function (req,res,next) {
    if(req.session.user){
        next()
    }else {
        req.flash('error','你还未登录，请登录')
        res.redirect('/user/signin')
    }
}
exports.checkNotLogin=function (req,res,next) {
    if(req.session.user){
        req.flash('error','你已经登录')
        res.redirect('/')
    }else{
        next()
    }
}