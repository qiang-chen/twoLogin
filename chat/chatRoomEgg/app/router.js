module.exports=app=>{
    const {router,controller,io}=app;
    
    const jurisdiction=app.middleware.jurisdiction()

    router.post("/user/register",controller.user.user.register)
    router.post("/user/login",controller.user.user.login)
    router.get("/user/list",jurisdiction,controller.user.user.getList)
    router.get("/user/my",jurisdiction,controller.user.user.getMyInfo)
    router.post("/user/upload",jurisdiction,controller.user.user.upload)
    //保存用户个人资料
    router.post("/user/saveUpdate",jurisdiction,controller.user.user.saveUpdate)
    //确认用户是不是有email存入
    router.get("/user/info",jurisdiction,controller.user.user.userInfo)
    //用户找回密码功能
    router.get("/user/find",controller.user.user.findPass)
    //用户修改密码功能
    router.post("/user/exit",controller.user.user.exitPass)

    //聊天
    io.of('/').route('chat', app.io.controllers.chat);
}