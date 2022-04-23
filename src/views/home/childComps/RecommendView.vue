<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
name:'RecommendView',
props:{
  recommends:{
    type:Array,
    default(){
      return []
    }
  }
}
}
</script>

<style>
.recommend{
  display: flex;
  width: 100%;
  padding: 10px 0 20px 0;
  border-bottom: 8px solid #eee;
}

.recommend-item{
  flex: 1;
  width: 25%;
  text-align: center;
  font-size: 12px;
}

.recommend-item img{
  width: 80%;  
}
</style>