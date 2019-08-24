<template>
    <div class="main">
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="foot">
            <router-link tag="span" to="/main/list">好友</router-link>
            <router-link tag="span" to="/main/chat">聊天</router-link>
            <router-link tag="span" to="/main/my">我的</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: .34rem;
  .content {
    flex: 1;
    overflow: hidden;
  }
  .foot {
    width: 100%;
    height: 1rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .active{
        color: red;
    }
  }
}
</style>
