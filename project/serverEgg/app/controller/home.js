const {Controller}=require("egg");

class Home extends Controller{
    async list(ctx){
        let {limit,pages}=ctx.request.query;
        let result=await ctx.service.home.getList(limit,pages);

        ctx.body={
            code:1,
            data:result
        }
    }
}

module.exports=Home;