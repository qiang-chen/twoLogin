<template>
  <div class="register">
    <h1>请注册账号</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="user">
        <el-input v-model="ruleForm.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
//引入api网络请求
import * as api from "@/api/index";
//引入加密函数
import { jsEncrypt } from "@/utils/jsencrypt.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass.trim() !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        user: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        user: [{ validator: validateUser, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //获取用户输入的用户名和密码
          let data = {
            user: this.ruleForm.user.trim(),
            pwd: jsEncrypt(this.ruleForm.pass.trim())
          };
          //发送注册的网络接口
          api.RegisterApi(data).then(res => {
            //console.log(res.data, "注册接口打印");
            if (res.data.code == 1) {
              this.$message({
                message: res.data.resaults,
                duration: 1000,
                type: "success",
                onClose: () => {
                  this.$router.history.push("/login");
                }
              });
            } else {
              this.$message.error(res.data.resaults);
            }
          });
        } else {
          this.$message({
            message: "请输入完整的信息",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.34rem;
  h1 {
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    margin: 0.2rem 0;
  }
}
</style>
