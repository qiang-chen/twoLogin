//取值本地的数据
import {
  getSession
} from '@/utils/creatToken'

// import {
//   List
// } from "@/api/list"

// const {List}=require("@/api/user").default

// const List=function(){}

let token, uid;

if (JSON.parse(getSession())) {
  token = JSON.parse(getSession()).token
  uid = JSON.parse(getSession()).uid
  console.log("为什么uid会没有", uid)
}



var state = {
  token: token,
  uid: uid,
  // list: [],
  // flag:false
}


window.state = state;
const reducers = {
  //修改token使用
  changeToken(state, action) {
    //console.log(action)
    state.token = action.token;
    console.log(state.token, "难道不一样吗")
    return {
      ...state
    }
  },
  changeUid(state, action) {
    //let newState = JSON.parse(JSON.stringify(state));
    state.uid = action.uid + "";
    console.log(state.uid, "没有复制上吗");
    return {
      ...state
    }
  },
  // changeList(state, action) {
  //   let newState = JSON.parse(JSON.stringify(state));
  //   newState.list = action.data
  //   return {
  //     ...newState
  //   }
  // },
  // changeFlag(state,action){
  //   let newState = JSON.parse(JSON.stringify(state));
  //   newState.flag = action.data
  //   return {
  //     ...newState
  //   }
  // }
}

// const effects = {
//   * getList({
//     payload
//   }, {
//     call,
//     put
//   }) {
//     //调用异步api
//     try {
//       console.log(token)
//       let data = yield call(List, payload)
//       yield put({
//         type: 'changeList',
//         data: data.data.data
//       });
//     } catch (error) {
//       console.log(error, "报错了亲")
//       //alert("登录已失效，请重新登录")
//       //修改flag控制页面进行路由跳转
//       yield put({
//         type: 'changeFlag',
//         data: true
//       });
//     }

//   },
// };


export default {
  namespace: 'user',
  state,
  reducers,
  //effects,
};