//引入仓库

import axios from 'axios'
//import store from "../store/model/user.js"

import {register,login} from "./port/port"



//const store=require("@/store/model/user.js")
//console.log(store,"是什么")


export function Register(body) {
  return axios.post(register, body);
}


export function Login(body){
  return axios.post(login,body)
}


// export async function List(data){
//   return axios.get(list,{
//     params:data,
//     headers:{
//       authorization:window.state.token,
//       uid:window.state.uid
//     }
//   })
// }