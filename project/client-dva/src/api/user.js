import axios from 'axios'

import {register,login} from "./port/port"


export function Register(body) {
  return axios.post(register, body);
}


export function Login(body){
  return axios.post(login,body)
}
