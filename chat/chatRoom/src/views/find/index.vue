<template>
    <div class="find">
        <h1>嘿,朋友！密码忘记了吧，幸亏我写了个找回密码功能,接下来按照提示去找回你的密码吧</h1>
        
        <el-input v-model="email" placeholder="请输入你的邮箱"></el-input>

         <el-button type="primary" round @click="find">找回密码</el-button>
    </div>
</template>

<script>

//引入api去找回密码

import * as api from '@/api/index';

export default {
    data(){
        return {
            email:""
        }
    },
    methods: {
       async find(){
           //console.log(this.email.trim())
           let data=await api.findUserPass({email:this.email.trim()});
           if(data.data.code){
               this.$message({
                message: data.data.msg,
                duration:1000,
                type: "success"
              });
           }else{
               this.$message.error(data.data.msg);
           }
        }
    },
}
</script>

<style lang="scss" scoped>
.find {
  width: 100%;
  height: 100%;
  font-size: 0.34rem;
}
</style>
