import axios from 'axios';

const request=axios.create({
    //判断一下是开发环境还是生产环境
    // baseURL:process.env.NODE_ENV==="development"?"http://localhost:8000":""
})

//请求前拦截
request.interceptors.request.use((config)=>{
    return  config;
})


//请求后拦截

request.interceptors.response.use(response=>{
    return response;
},error=>{
  console.log(error,"请求失败的时候");
})

export default request;


