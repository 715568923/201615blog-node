/**
 * Created by lenovo on 2017/4/10.
 */
let express=require('express');
let router=express();
let multer=require('multer');
let {checkLogin,checkNotLogin}=require('../ware');
let User=require('../model').User;
var upload = multer({ dest: './public/uploads/'});
router.get('/signup',checkNotLogin,function (req,res) {
    res.render('user/signup',{title:'注册'})
})
router.post('/signup',checkNotLogin,upload.single('avatar'),function (req,res) {
    let user=req.body;
    let avatar=req.file;
    // console.log(avatar)
    user.avatar=`/uploads/${req.file.filename}`;
    User.findOne({username:req.body.username},function (err,oldDoc) {
        if(oldDoc){
            req.flash('error','你以注册过此用户名')
            res.redirect('back')
        }else{
            User.create(user,function (err,doc) {
                if(err){
                    req.flash('error',err.toString())
                    res.redirect('back')
                }else{
                    req.flash('success','恭喜你注册成功，请登录')
                    res.redirect('/user/signin');
                }
            })
        }
    })


})
router.get('/signin',checkNotLogin,function (req,res) {
    res.render('user/signin',{title:'登录'})
})
router.post('/signin',checkNotLogin,function (req,res) {
    let user=req.body;
    User.findOne(user,function (err,doc) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back')
        }else{
            if(doc){
                req.session.user=doc;
                req.flash('success','恭喜你登录成功')
                res.redirect('/');
            }else{
                req.flash('error','登录失败')
                res.redirect('back')
            }

        }
    })

})
router.get('/signout',function (req,res) {
    req.session.user=null;
    res.redirect('/')
})
module.exports=router;