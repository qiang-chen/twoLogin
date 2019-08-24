<template>
  <div>
    <Header title="聊天室"></Header>
    <div @click="sendSocketMsg">
      <button>发socket信息</button>
    </div>
  </div>
</template>

<script>
//引入头部组件
import Header from "@/components/header.vue";

import {mapState} from "vuex"
import * as api from "@/api/index"

export default {
  data() {
    return {
      info:{},
      mess:[]
    }
  },
  components: {
    Header
  },
  async created() {
     let d= await api.getMyInfo();
    this.info = d.data.info;
    //console.log(this.info);
  },
  computed: {
    
  },
  mounted() {
    this.sockets.subscribe("res", data => {
      console.log(data,"这里接受的吗");
    });
     this.sockets.subscribe("err", data => {
      console.log(data);
    });
  },
  methods: {
    sendSocketMsg() {
      this.$socket.emit("chat", {
        user:this.info.username,
        group: "我想发消息"
      });
    }
  }
};
</script>