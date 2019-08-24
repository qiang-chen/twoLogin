const {
    Controller
} = require("egg");

const {
    jsencrypt
} = require("../../utils/jsencrypt.js")

const save = require("../../utils/saveImg.js")


//另一款加密工具

const jwt = require("jwt-simple")

//引入找回密码函数

const {
    sendEmail
} = require("../../utils/findPass.js")

class User extends Controller {
    async register(ctx) {
        //接受传过来的密码和用户名
        //console.log(ctx.request.body);
        let {
            user,
            pwd
        } = ctx.request.body;

        let resaults = ""; //用来判断是否注册成功的字段
        let code = 1;
        let findResaults = await ctx.service.user.user.find(user);
        if (findResaults.length) {
            //证明找到该用户
            code = 0;
            resaults = "该用户已被注册"
        } else {
            //调用注册函数去注册用户
            try {
                let saveUser = await ctx.service.user.user.register({
                    user,
                    pwd
                });
                resaults = "注册成功";
            } catch (error) {
                console.log(error);
                code = 0;
                resaults = "该用户名或者密码不符合规范，换一个试试呗";
            }


        }
        ctx.body = {
            code,

            resaults
        }
    }
    async login(ctx) {
        //首先去数据库查询该用户是否存在
        let code = 1,
            msg = "";
        let token = ""
        let {
            username,
            password
        } = ctx.request.body;
        try {
            //根据用户名去数据库查询
            let result = await ctx.service.user.user.find(username);

            if (result.length) {
                //证明数据库有这个用户
                //对传过来的密码进行解密与数据库的密码进行解密然后比较是不是相等
                let pwd = jsencrypt(password);
                let mysqlPwd = jsencrypt(result[0].password);
                if (pwd === mysqlPwd) {
                    //生成一个token返给前端
                    let secret = "xxx";
                    token = jwt.encode(username, secret);
                    msg = "登陆成功"
                } else {
                    code = 0;
                    msg = "用户名和密码不匹配"
                }
            } else {
                code = 0;
                msg = "该用户还未注册"
            }
        } catch (error) {
            code = 0;
            msg = "服务器错误，请稍后重试"
        }
        ctx.body = {
            code,
            msg,
            token
        }
    }
    //获取用户列表的数据
    async getList(ctx) {
        let token = ctx.request.header.authorization;
        //这里需要写一个统一的拦截器 未完待续
        let data = await ctx.service.user.user.getList();
        ctx.body = {
            code: 1,
            data,
            token,
        }
    }
    //获取我的个人信息
    async getMyInfo(ctx) {
        let token = ctx.request.header.authorization;
        //根据这个token去数据库查找数据找到对应的用户返给前端
        //解密token  去寻找用户
        let secret = "xxx"; //解密加密所对应的key
        let decode = jwt.decode(token, secret);
        let data = await ctx.service.user.user.find(decode);
        ctx.body = {
            code: 1,
            token,
            info: data[0]
        }
    }
    //储存图片处理
    async upload(ctx) {
        let token = ctx.request.header.authorization;
        let file = ctx.request.files[0];
        let msg = "";
        let fileName = new Date().getTime() + file.filename
        try {
            msg = await save(fileName, file.filepath)
            //成功之后将这个路径存到数据库里面去  /public/时间戳1.jpg
            //将token解密后找到对应的那一项然后把图片路径存到数据库
            let secret = "xxx"; //解密加密所对应的key
            let username = jwt.decode(token, secret);
            try {
                let id = await ctx.service.user.user.find(username);
                id = id[0].id;
                let result = await ctx.service.user.user.saveImg(id, `/public/${fileName}`)
                msg = "修改成功"
            } catch (error) {
                msg = "修改失败"
            }

        } catch (error) {
            msg = error;
        }

        ctx.body = {
            token,
            code: 1,
            msg,
            portrait: `/public/${fileName}`
        }
    }
    //保存用户个人资料 签名邮箱之类的
    async saveUpdate(ctx) {
        let token = ctx.request.header.authorization;
        let code = 1,
            msg = "";
        try {
            let secret = "xxx"; //解密加密所对应的key
            let username = jwt.decode(token, secret);
            let id = await ctx.service.user.user.find(username);
            id = id[0].id;
            let {
                portrait,
                email,
                ellipsis
            } = ctx.request.body;
            let result = await ctx.service.user.user.exitUser(id, portrait, email, ellipsis);

            code = 1
            msg = "修改成功"
        } catch (error) {
            code = 0
            msg = "修改失败"
        }
        ctx.body = {
            code,
            msg,
            token
        }
    }

    //确认用户是不是写入了email
    async userInfo(ctx) {
        let token = ctx.request.header.authorization;
        let code = 1,
            msg = "";
        try {
            let secret = "xxx"; //解密加密所对应的key
            let username = jwt.decode(token, secret);
            let user = await ctx.service.user.user.find(username);
            code = 1;
            msg = user[0].email;
        } catch (error) {
            code = 0
            msg = "";
        }
        ctx.body = {
            code,
            msg,
            token
        }
    }
    //找回密码功能
    async findPass(ctx) {
        let {email} = ctx.request.query;
        console.log(email,"不信还不行");
        let code = 1,
            msg = "请注意查收您的邮件";
        try {
            let user = await ctx.service.user.user.findEmail(email);
            
            if(user.length){
                code = 1;
                sendEmail(user[0].username, email, `http://169.254.155.89:8080/#/exitPass/${email}`)
            }else{
                code = 0
                msg = "该邮件不存在";
            }
        } catch (error) {
            code = 0
            msg = "该用户未找到";
        }
        ctx.body = {
            code,
            msg,
        }
    }
    //修改密码功能
    async exitPass(ctx){
        let msg="",code=1;
        let {email,password}=ctx.request.body;
        try {
            let user = await ctx.service.user.user.findEmail(email);
            let result=await ctx.service.user.user.exitPass(user[0].id,password)
            msg="修改密码成功"
        } catch (error) {
            msg="修改失败，请重试"
        }
        ctx.body={
            code,
            msg
        }
    }
}

module.exports = User;;