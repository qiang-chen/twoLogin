const {
    Service
} = require("egg");

class User extends Service {
     //查找函数
    find(username) {
        let findReaults = this.app.mysql.select("user", {
            where: {
                username
            }
        });
        return findReaults;
    }
    //跟新token字段函数
   async upload(id,token){
        const row = {
            id,
            token,
          };
          const result = await this.app.mysql.update('user', row); // 更新 posts 表中的记录
          return result
    }
    //用户注册
    register(username, password, uid) {
        let $save = this.app.mysql.insert("user", {
            username,
            password,
            uid
        })
        return $save;
    }
    //登录函数
    login(username,password){
        let findReaults = this.app.mysql.select("user", {
            where: {
                username,
                password
            }
        });
        return findReaults;
    }
}

module.exports = User;