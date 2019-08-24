//引入md5  生成一个随机的token进行加密处理
const md5=require("md5");

module.exports.createToken=function(uid){
    const token=JSON.stringify({
        uid,
        time:new Date().getTime()
    });
    return md5(token)
}