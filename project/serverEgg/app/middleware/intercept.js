//封装一个中间件进项请求拦截处理
module.exports = (options, app) => {
    return async function intercept(ctx, next) {
        let {
            authorization,
            uid
        } = ctx.request.header
        //console.log(authorization,uid)
        let result
        try {
            result = await ctx.service.intercept.find(uid);
        } catch (error) {
            ctx.status = 401;
            ctx.body = {
                code: 0,
                msg: "没有权限查询报错"
            }
            return 
        }
        if (result) {
            console.log(result.token ,authorization,"不想？")
            if (result.token == authorization) {
                await next()
            } else {
                ctx.status = 401;
                ctx.body = {
                    code: 0,
                    msg: "token不匹配"
                }
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                code: 0,
                msg: "根据uid没有找到该用户"
            }
        }

    }
}