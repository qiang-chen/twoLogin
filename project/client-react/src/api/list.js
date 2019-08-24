import axios from 'axios'
import {
    list
} from "./port/port"


// //引入仓库
import store from "@/store/model/user.js"
//const state=require("@/store/model/user.js")


export async function List(data) {

    console.log(store, "是什么list")
    return axios.get(list, {
        params: data,
        headers: {
            authorization: store.state.token,
            uid: store.state.uid
        }
    })
}