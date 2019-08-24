//网络请求发送位置

//引入拦截后抛出的对象

import request from '@/utils/request';

//引入众多接口
import {register,login,getuser,getmyinfo,saveUpdate,confimInfo,findPass,exitPass} from "./port/port";

//注册接口发送请求
export function RegisterApi(data){
    return request.post(register,data)
}

//登录页面发送接口
export function Login(data){
    return request.post(login,data)
}

//获取用户列表接口

export function getUser(){
    return request.get(getuser)
}

//获取我的个人信息资料

export function getMyInfo(){
    return request.get(getmyinfo)
}

//保存用户修改到的资料

export function saveUserUpdata(data){
    return request.post(saveUpdate,data)
}

//在首页确认是否邮箱被传入了

export function confimuserInfo(){
    return request.get(confimInfo)
}

//找回密码功能

export function findUserPass(email){
    return request.get(findPass,{
        params:email
    })
}

//修改密码功能
export function exitUserPass(data){
    return request.post(exitPass,data)
}