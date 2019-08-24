
//公共方法  获取和存取cookie使用的
import Cookies from "js-cookie"

export function setCookeies(token){
    //存Cookies使用
    //console.log(token,"进来了吗")
   return Cookies.set('token', token, { expires: 1/24 });
}

export function getCookeies(){
    return Cookies.get("token")
}