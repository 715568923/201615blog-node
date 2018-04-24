/**
 * Created by lenovo on 2017/4/8.
 */
let express=require('express');
let Article=require('../model').Article;
let router=express.Router();
router.get('/',function (req,res) {
    let query={}

    let pageNum=isNaN(req.query.pageNum)?1: parseInt(req.query.pageNum);//当前是第几页
    let pageSize=isNaN(req.query.pageSize)?5: parseInt(req.query.pageSize);//每页的条数

    if(req.query.keyword){
        query.title=new RegExp(req.query.keyword)
    }
    Article.count(query,function (err,count) {//统计记录数
        Article.find(query).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,articles){
            console.log(articles)
            res.render('index',{
                title:'首页',
                articles,
                keyword:req.query.keyword,
                pageNum,
                pageSize,
                totalPages:Math.ceil(count/pageSize)})
        })
    })

})
module.exports=router;
