
//此文件主要处理axios服务拦截
import qs from "qs"
import axios from "axios";

//引入仓库获取仓库中的token

import jurisdiction from "@/store/module/jurisdiction.js";

const request = axios.create({
  //判断是开发环境还是生产环境
  timeout:5000,
  baseURL: process.env.NODE_ENV === "development" ? "/api" : "", //因为api这个前缀是我们在开发环境使用的
  //真实上线是去掉的 但是我们又不能每次上线开发都要改n个接口去 
  //所以可以在这里统一给其加上这个前缀

  //然后接下来就把公共参数统一放在header里面

  //这样直接发送的话会造成第一次登录后token为空  因为代码执行了一遍
  //所以此时就需要拦截器了
  // headers:{
  //     token:getCookeies()||$store.state.login.token
  // }
})


//通过请求拦截我们在给其添加共同的请求头放上token字段

//所谓的请求前拦截就是不管什么请求在发送的时候都会执行一下这个方法
//我们除了可以在这里添加公共的请求头信息以外 还可以放在loading一类的
//在发送前的时候加上 然后请求结束后关闭


request.interceptors.request.use((config) => {
    //console.log(config,"===");
    config.method==="post"?config.data=qs.stringify({...config.data}):config.params={...config.params};
    config.headers['Content-Type']='application/x-www-form-urlencoded';
    //注意如果请求头这样设置后 后台的body必须 是下面的设置  默认是bodyParser.json()
    //bodyParser.urlencoded({ extended: false })
  config.headers['authorization'] = jurisdiction.state.token
  return config;
})


//请求响应后的拦截
request.interceptors.response.use((response) => {
  //axios 的返回值是有一层data包裹的 然后我们可以通过response.data 让我们少解析一层
  //注意只要写了这个请求后的拦截就必须有return的返回值  不然的话后面我们获取不到任何数据
 
    return response
  //当然主要用途不是为了做上面的事情 而是为了统一做一些错误处理情况
},(error)=>{
  
  //在发生错误后统一跳到登录页面
  const flag=confirm("您的登录已过期，是否返回登录页面重新登录")
  if(flag){
    window.location.href="http://localhost:8080/#/login"
  }
})

export default request;