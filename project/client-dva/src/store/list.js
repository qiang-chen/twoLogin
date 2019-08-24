//获取列表数据

import {getList} from "../api/list"

export default {

  namespace: 'list',

  state: {
      list:[],
      flag:false
  },

  reducers: {
    changeList(state, action) {
        state.list=action.list;
      return {...state};
    },
    changFlag(state,action){
        state.flag=action.flag;
        return {...state}
    }
  },

  effects: {
    *getList({ payload }, { call, put }) {
        try {
            let list=yield call(getList,payload);
            yield put({ type: 'changeList' ,list:list.data.data});
        } catch (error) {
            console.log(error);
            yield put({type:"changFlag",flag:true})
        }
    },
  }

};