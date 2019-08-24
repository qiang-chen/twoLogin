<template>
    <div class="login">
        <h1>登录页面</h1>
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="formLabelAlign.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" round @click="submit">登录</el-button>
                <el-button type="primary" round @click="register">注册</el-button>
                 <el-button type="primary" round @click="find">找回密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
//引入加密第三方函数 进行加密处理
import { jsEncrypt } from "@/utils/jsencrypt.js";

import * as api from "@/api/index";

import {setCookeies} from  "@/utils/cookie.js"

import {mapMutations} from "vuex"

export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapMutations({
        saveToken:"jurisdiction/changeToken"
    }),
    submit() {
      //将密码进行加密
      let password = jsEncrypt(this.formLabelAlign.password);
      let data = {
        password,
        username: this.formLabelAlign.username
      };
      api.Login(data).then(res => {
        if (res.data.code) {
          //将登录返回的身份令牌存到本地和仓库中去
          setCookeies(res.data.token)
          this.saveToken({token:res.data.token})
          this.$message({
            message: res.data.msg,
            duration:1000,
            onClose:()=>{
                this.$router.history.push("/main")
            },
            type: "success"
          });
        }else{
            this.$message.error(res.data.msg);
        }
      });
    },
    register() {
      this.$router.history.push("/register");
    },
    find(){
      this.$router.history.push("/find")
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  font-size: 0.34rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
  h1 {
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    border-bottom: 1px solid #eee;
    font-size: 0.5rem;
  }
}
.el-button {
  outline: none !important;
}
</style>
