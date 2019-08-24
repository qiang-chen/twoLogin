<template>
    <div class="listHead">{{title}}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.listHead {
    width: 100%;
    height: 1rem;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.44rem;
    color: #fff;
}
</style>