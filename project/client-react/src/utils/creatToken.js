//往本地存值和取值

//取
export function getSession(){
    return localStorage.getItem("authorization")
}

export function setSession(opt){
    console.log(opt,"本地存储的时候");
      localStorage.setItem("authorization",JSON.stringify(opt))
}