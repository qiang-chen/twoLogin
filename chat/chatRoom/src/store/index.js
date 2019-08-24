//仓库主出口文件
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//引入中间件 记录操作日志的作用

import Logger from "vuex/dist/logger"


//引入用户权限的子模块

import jurisdiction from "./module/jurisdiction"

//引入子模块
import user  from "./module/user";

//生成一个实例将其抛出

export default new Vuex.Store({
    modules:{
        user,
        jurisdiction
    },
    plugins:[Logger()]
})