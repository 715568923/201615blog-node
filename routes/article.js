/**
 * Created by lenovo on 2017/4/8.
 */
let express=require('express');
let router=express.Router();
let Article=require('../model').Article;
let {checkLogin,checkNotLogin}=require('../ware')
router.get('/add',checkLogin,function (req,res) {
   res.render('article/add',{title:'发表文章'})
})
router.post('/add',checkLogin,function (req,res) {
    let article=req.body;
    //从当前的会话中得到用户的ID，之后赋给文章的user属性
    article.user=req.session.user._id;
    Article.create(article,function (err,doc) {
        if(err){
            req.flash('error','发表文章失败');
            res.redirect('back')
        }else{
            req.flash('success','发表文章成功');
            res.redirect('/')
        }
    })
})
router.get('/detail/:_id',function (req,res) {
    let _id=req.params._id;
    Article.findById(_id,function (err,article) {
        res.render('article/detail',{title:'文章详情',article})
    })
})
router.get('/delete/:_id',function (req,res) {
    let _id=req.params._id;
    Article.remove({_id},function (err,article) {
        if(err){
            req.flash('error','删除文章失败')
            res.redirect('back');
        }else{
            req.flash('success','删除文章成功')
            res.redirect('/')
        }

    })
});

router.get('/update/:_id',function (req,res) {
    let _id=req.params._id;
    Article.findById(_id,function (err,article) {
        console.log(article)
        res.render('article/add',{title:'修改文章',article})
    })
})
router.post('/update/:_id',function (req,res) {
    let _id=req.params._id;
    let article=req.body;
    Article.update({_id},req.body,function (err,result) {
        if(err){
            req.flash('error','更新文章失败')
            res.redirect('back')
        }else{
            req.flash('success','更新成功')
            res.redirect(`/article/detail/${_id}`);
        }

    })
})
module.exports=router;