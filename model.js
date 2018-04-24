/**
 * Created by lenovo on 2017/4/8.
 */
let mongoose=require('mongoose');
let url = require('./config').url;
//console.log(mongoose.Schema.Types)
let ObjectId=mongoose.Schema.Types.ObjectId;
mongoose.connect(url);
let UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
},{collection:'user'});
exports.User= mongoose.model('User',UserSchema);

let ArticleSchema=new mongoose.Schema({
    title:String,
    content:String,
    createAt:{type:Date,default:Date.now()},
    user:{type:ObjectId,ref:'User'}//ref ，表示自己是一个外键，引用的是User 集合的主键
},{collection:'article'});
exports.Article= mongoose.model('Article',ArticleSchema);
