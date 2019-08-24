//写个用户权限的仓库 专门储存用户信息

import {
    getCookeies
  } from "@/utils/cookie"

const state={
    token:getCookeies()||"",
    info:{}  //个人基本信息展示
}

//同步方法修改用户身份令牌token

const mutations={
    changeToken(state,payload){
        state.token=payload.token
    },
    changeInfo(state,payload){
        state.info=payload.info
    }
}

export default {
    namespaced: true,
    state,
    mutations
}