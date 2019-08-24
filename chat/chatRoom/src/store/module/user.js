import * as api from "@/api/index"
import {
  getCookeies
} from "@/utils/cookie"

const state = {
  userList: []
}

//同步方法

const mutations = {
  changeList(state, payload) {
    state.userList = [...payload.data]
  }
}

//异步方法
const actions = {
  getList({
    commit
  }, payload) {
    //发起网络请求，请求用户数据
    //返回一个promise把 方便处理错误
    return new Promise((resolve, reject) => {
      api.getUser().then(res => {
        commit("changeList", res.data)
        resolve("成功")
      }).catch(err=>{
        //console.log(err,"仓库里面的登录错误")
        //console.log(getCookeies(),"sh")
        commit("jurisdiction/changeToken", {token:getCookeies()},{
          root:true
        })
        reject("失败")
      })
    })

  }
}

//抛出
export default {
    namespaced: true,
    state,
    mutations,
    actions
}