const {
    Controller
} = require("egg");

const {createToken}=require("../utils/createToken.js")

class User extends Controller {
    async register(ctx) {
        //console.log(ctx.request.body);
        let {
            username,
            password
        } = ctx.request.body;
        //调用查找函数来查询数据库是否该用户已被注册
        let msg = "";
        let code=1;
        let uid=new Date().getTime()
            try {
                let result = await ctx.service.user.find(username)
                if (result.length) {
                    //证明该用户已被注册过
                    msg = "该用户已被注册过",
                    code=0;
                } else {
                    //在调用存入数据库函数
                    try {
                        let saveResult=await ctx.service.user.register(username,password,uid);
                        msg="注册成功"
                    } catch (error) {
                        msg = "服务器错误，请稍后重试"
                        code=0;
                        //console.log(error,'存入失败了吗');
                    }
                }
            } catch (error) {
                msg = "服务器错误，请稍后重试"
                code=0;
                // console.log(error,"失败了吗")
            }
        ctx.body = {
            code,
            msg
        }
    }
    //登录验证
    async login(ctx){
        let code,msg,token,uid;
        let {username,password}=ctx.request.body;
        try {
            let result=await ctx.service.user.login(username,password);
           
            if(result.length){
                //证明登录成功
                //生成一个token和用户的id返给前端
                token=createToken(result[0].id);
                uid=result[0].id;
                //更新数据库的token字段 也就是将这个token存到数据库里面去
                let updata=await ctx.service.user.upload(result[0].id,token)
                code=1;
                msg="登录成功"
            }else{
                code=0;
                msg="该用户还未被注册或密码不正确"
            }
        } catch (error) {
            code=0;
            msg="服务器错误，请重试"
        }
        ctx.body={
            code,
            msg,
            token,
            uid
        }
    }
}

module.exports = User;