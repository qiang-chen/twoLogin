
//获取本地token
export function getToken(){
    return JSON.parse(localStorage.getItem("authorization"))
}

export function setToken(opt){
    localStorage.setItem("authorization",JSON.stringify(opt))
}