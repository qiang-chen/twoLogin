<template>
  <div>
    <Header title="个人信息"></Header>
    <div class="titleName">
      <h2>欢迎你 {{info.username}} 请修改你的个人资料把</h2>
    </div>
    <ul>
      <li>个性签名 :
        <el-input v-model="info.ellipsis"></el-input>
      </li>
      <li>个人邮箱
        <el-input v-model="info.email"></el-input>
      </li>
      <li>
        <p>上传一个你喜欢的头像吧</p>
        <p>
          <el-upload
            class="avatar-uploader"
            action="/api/user/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="{authorization}"
          >
            <img v-if="info.portrait" :src="'api'+info.portrait" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </p>
      </li>
      <li>
        <el-button type="primary" @click="submit">确认修改
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
// 引入好友列表组件
import FriendItem from "@/components/friendItem";
//引入头部组件
import Header from "@/components/header.vue";

import * as api from "@/api/index";

//引入仓库 获取仓库中存储的token  将其上传图片的时候进行保存
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      info: {}
    };
  },
  computed: {
    ...mapState({
      authorization: state => state.jurisdiction.token
    })
  },
  components: {
    FriendItem,
    Header
  },
  async created() {
    let data = await api.getMyInfo();
    this.info = data.data.info;
  },
  methods: {
    ...mapMutations({
      saveInfo: "jurisdiction/changeInfo"
    }),
    handleAvatarSuccess(res, file) {
      this.info.portrait = res.portrait;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async submit() {
      //发送网络请求 让其保存用户修改的资料
      let res = await api.saveUserUpdata(this.info);
      if (res.data.code == 1) {
        this.$message({
          message: res.data.msg,
          duration: 1000,
          type: "success"
        });
      } else {
        this.$message.error(res.data.msg);
      }
      //将最新数据存到仓库里面去
      this.saveInfo({ info: this.info });
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
