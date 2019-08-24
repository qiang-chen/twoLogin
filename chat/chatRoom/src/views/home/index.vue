<template>
    <div class="bg">
        <div class="box">
            <button class="login" @click="login">登录</button>
            <button @click="register">注册</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        login(){
            //跳转登录页
            this.$router.history.push("/login")
        },
        register(){
            //跳转注册页面
            this.$router.history.push("/register")
        }
    },
}
</script>

<style lang="scss" scoped>
    .bg{
        width: 100%;
        height: 100%;
        background-image: url("../../assets/bg.jpg");
        background-size: 100%;
        display: flex;
        align-items: center;
        .box{
            width: 100%;
            height: 2rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            button{
                width: 2.4rem;
                height: 1rem;
                border-radius: .2rem;
                font-size: .36rem;
                border: 0;
            }
            .login{
                background-color: green;
                border: 0;
                color: #fff;
            }
        }
    }
</style>
