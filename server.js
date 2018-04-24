/**
 * Created by lenovo on 2017/4/8.
 */
let express=require('express');
let path=require('path');
let app=express();
let bodyParser=require('body-parser');

let session=require('express-session');
let MongoStore=require('connect-mongo')(session);
let url=require('./config').url

let flash=require('connect-flash');//把信息写在session 里的中间件

app.use(session({
    secret:'zfpx',
    saveUninitialized:true,
    resave:true,
    cookie:{maxAge:1000*10*360},
    store:new MongoStore({url})
}));
app.use(flash());//此中间件会向req.flash  可以读写消息
app.use(function (req,res,next) {
    //res.locals  是真正渲染模板对象
    res.locals.success=req.flash('success').toString();
    res.locals.error=req.flash('error').toString();
    res.locals.user=req.session.user;
    res.locals.keyword='';
    res.locals.article=req.session.user;

    next()
})
app.use(express.static(path.resolve('public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//引入模板
app.set('views',path.resolve('views'));
app.set('view engine','html')
app.engine('html',require('ejs').__express);

let user=require('./routes/user');
let article=require('./routes/article');
let index=require('./routes/index');
app.use('/',index)
app.use('/user',user);
app.use('/article',article);



app.listen(4000);