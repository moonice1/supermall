<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name:'NavBar'
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    line-height: 44px;
    /* 当没有内容时，只写line-height撑不起来，此时要设置height；有内容时不加height也可以撑起来 */
    /* height: 44px; */
    /* background-color: aqua; */
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }

  .left,.right{
    width: 60px;
    /* background-color:blueviolet; */
  }

  .center{
    flex: 1;
  }
</style>