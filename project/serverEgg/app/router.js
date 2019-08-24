module.exports=app=>{
    const {router,controller}=app;
    const intercept=app.middleware.intercept()
    router.post("/user/register",controller.user.register);
    router.post("/user/login",controller.user.login)
    router.get("/user/list",intercept,controller.home.list)
}