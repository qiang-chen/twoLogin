//请求前的身份检验

const jwt = require("jwt-simple")

module.exports = (options, app) => {
    return async function jurisdiction(ctx, next) {

        try {
            //获取请求头 然后进行判断是否有权限继续访问

            //拿着这个身份令牌去仓库进行确认身份 看此用户是不是存在 先进行解密

            //进行解密
            let secret = "xxx"; //解密加密所对应的key
            let token = jwt.decode(ctx.request.header.authorization, secret);
            //拿着解密出来的东西去数据库查找 看是否能够找到这个人
            //console.log(ctx)
            let result = await ctx.service.user.user.find(token);
            //找到这个人后进行下一项  找不到然后报权限问题
            if (result.length) {
                await next()
            } else {
                ctx.status = 401;
                ctx.body = {
                    code: 0,
                    msg: "登录失效,请重新登录"
                }
            }
        } catch (error) {
            ctx.status = 401;
            ctx.body = {
                code: 0,
                msg: "登录失效,请重新登录"
            }
        }


    }
}