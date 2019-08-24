const {
    Service
} = require("egg");

class User extends Service {
    //查找函数
    async find(username) {
        const results = await this.app.mysql.select('chatuser', {
            where: {
                username
            }
        });
        return results;
    }
    register(opt) {
        //先去用户表查询该用户是不是存在了
        let {
            user,
            pwd
        } = opt;
        const $save = `insert into chatuser(username,password) values("${user}","${pwd}")`;
        let userReaults = this.app.mysql.query($save)

        return userReaults
    }
    async getList() {
        const results = await this.app.mysql.select('chatuser');
        return results;
    }
    //保存图片函数
    async saveImg(id,portrait) {
        
        const row = {
            id: id,
            portrait: portrait,
        };
        const result = await this.app.mysql.update('chatuser', row);
        return result
    }
    //修改用户资料
    async exitUser(id,portrait,email,ellipsis){
        const row = {
            id: id,
            portrait: portrait,
            email,
            ellipsis,
        };
        const result = await this.app.mysql.update('chatuser', row);
        return result
    }
    //查找该用户邮箱是不是注册了
    async findEmail(email){
        const results = await this.app.mysql.select('chatuser', {
            where: {
                email
            }
        });
        return results;
    }
    //修改密码
    async exitPass(id,password){
        const row = {
            id: id,
            password
        };
        const result = await this.app.mysql.update('chatuser', row);
        return result
    }
}

module.exports = User;