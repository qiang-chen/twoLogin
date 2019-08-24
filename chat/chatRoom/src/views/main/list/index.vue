<template>
    <div class="list">
        <Header title="好友列表"></Header>
        <div class="listMain">
            <!-- 存放好友列表组件的 -->
            <FriendItem v-for="item in userList" :key="item.id" :item="item"></FriendItem>
        </div>
    </div>
</template>

<script>
// 引入好友列表组件
import FriendItem from "@/components/friendItem";
//引入头部组件
import Header from "@/components/header.vue";

import { mapActions, mapState } from "vuex";

//引入网络请求
import * as api from "@/api/index";

export default {
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState({
      userList: state => state.user.userList,
      info: state => state.jurisdiction.info
    })
  },
  components: {
    FriendItem,
    Header
  },
  async created() {
    //调用仓库方法获取异步数据
    api.confimuserInfo().then(res => {
      if (!res.data.msg) {
        this.$message({
          showClose: true,
          duration: 0,
          message: "为了保证您后期忘记密码后可以找回请去完善资料",
          type: "warning"
        });
      }
    });

    let data;
    try {
      data = await this.getUser();
    } catch (error) {
      console.log(error, "页面中报错");
    }
  },
  methods: {
    ...mapActions({
      getUser: "user/getList"
    })
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .listMain {
    flex: 1;
    overflow: auto;
  }
}
</style>
