const config = {};
config.key = "123321";

config.security = {
    csrf: false
};

config.mysql={
    client:{
        host:"localhost",
        port:"3306",
        user:"root",
        password:"root",
        database:"1702f"
    },
    app:true,
    agent:false
}



module.exports = config;