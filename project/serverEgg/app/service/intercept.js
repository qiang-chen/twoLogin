const {Service}=require("egg");

class Intercept extends Service{
   async find(id){
        const result = await this.app.mysql.get('user', { id:id*1 });
        return result;
    }
}

module.exports=Intercept;