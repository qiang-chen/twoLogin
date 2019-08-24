<template>
    <div class="item">
        <div class="left">
            <img  v-if="item.portrait" :src="'api'+item.portrait" alt="">
        </div>
        <div class="right">
            <h1>
                <span class="show">姓名:</span>
                <span class="ellipsis">{{item.username}}</span>
            </h1>
            <h3>
                <span class="show">个性签名:</span>
                <span class="ellipsis">{{item.ellipsis}}</span>
            </h3>
        </div>
    </div>
</template>

<script>
export default {
  props:{
    item:{
      type:Object,
      default:{}
    }
  }
}
</script>


<style lang="scss" scoped>
.item {
  width: 100%;
  height: 2rem;
  border-bottom: 1px solid #999;
  padding: 0 0.1rem;
  box-sizing: border-box;
  display: flex;
  font-size: 0.34rem;
  background-color: #eeeeee;
  margin-top: .1rem;
  &:nth-child(1){
      margin-top: 0;
  }
  .left {
    flex: 3;
    margin-right: 0.3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex: 7;
    display: flex;
    flex-direction: column;
    min-width: 0;
    h1 {
      flex: 6;
      height: 100%;
      overflow: hidden;
      min-width: 0;
      display: flex;
      align-items: center;
      .show {
        width: 40%;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 0.56rem;
      }
      .ellipsis {
        width: 60%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0.48rem;
        color: mediumorchid;
      }
    }
    h3 {
      flex: 4;
      display: flex;
      align-items: center;
       overflow: hidden;
      min-width: 0;
      .show {
        width: 40%;
        height: 100%;
         display: flex;
        align-items: center;
      }
      .ellipsis {
        width: 60%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0.38rem;
        color: #999;
      }
    }
  }
}
</style>
