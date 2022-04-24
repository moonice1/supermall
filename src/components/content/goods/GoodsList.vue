<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item">
    </goods-list-item>
    
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name:'GoodList',
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>

<style>
.goods{
  display: flex;
  /* 包裹 */
  flex-wrap: wrap;
  /* 均等分 */
  /* justify-content: space-around;
  padding: 2px; */
  justify-content: space-evenly;
}
</style>