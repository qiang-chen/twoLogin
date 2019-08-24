//用户区域封装
import {getToken} from "../utils/createToken"
//获取token

let authorization=getToken()


const state={
    token:authorization&&authorization.token||null,
    uid:authorization&&authorization.uid||null
}

//同步函数
const reducers={
    //修改token使用
    changeToken(state,action){
        // let newState=JSON.parse(JSON.stringify(state));
        state.token=action.token;
        state.uid=action.uid;
        return {
            ...state
        }
    }
}


export default {
    namespace: "user",
    state,
    reducers
}