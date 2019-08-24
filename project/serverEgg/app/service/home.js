const {Service}=require("egg");

class Home extends Service{
    async getList(num,start){
        const results = await this.app.mysql.select('movie', {
            limit:num*1, // 返回数据量
            offset:start*1, // 数据偏移量
          });
          return results;
    }
}

module.exports=Home;