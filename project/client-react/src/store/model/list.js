import {
    List
  } from "@/api/list"

export default {

  namespace: 'list',

  state: {
    list: [],
    flag:false
  },

  reducers: {
    changeList(state, action) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.list = action.data
        return {
          ...newState
        }
      },
      changeFlag(state,action){
        let newState = JSON.parse(JSON.stringify(state));
        newState.flag = action.data
        return {
          ...newState
        }
      }
  },

  effects: {
    * getList({
        payload
      }, {
        call,
        put
      }) {
        //调用异步api
        try {
         
          let data = yield call(List, payload)
          yield put({
            type: 'changeList',
            data: data.data.data
          });
        } catch (error) {
          console.log(error, "报错了亲")
          //alert("登录已失效，请重新登录")
          //修改flag控制页面进行路由跳转
          yield put({
            type: 'changeFlag',
            data: true
          });
        }
    
      },
  }

};