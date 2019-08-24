//首页数据的获取

import axios from "axios";

//引入仓库
import store from "../store/user"

export function getList(data){
    return axios.get("/api/user/list",{
        params: data,
        headers: {
            authorization: store.state.token,
            uid: store.state.uid
        }
    })
}