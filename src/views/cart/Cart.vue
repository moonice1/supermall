<template>
<div class="cart">
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
  </nav-bar>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import { mapGetters } from "vuex"
export default {
name:'Cart',
components:{
  NavBar
},
computed:{
  // cartLength(){
  //   return this.$store.getters.cartLength
  // }

// mapGetters辅助函数混入getter
    // 两种语法
    // 1.使用对象展开运算符将 getter 混入 computed 对象中
    // ...mapGetters(['cartLength','cartList'])
    // 2.将一个 getter 属性另取一个名字，使用对象形式：
  ...mapGetters({
      length: 'cartLength',
      list:'cartList'
    }),
}
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}

</style>