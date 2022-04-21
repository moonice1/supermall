<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>    
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
        
  </div>
</template>

<script>

export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
    return{
      // isActive:true
    }    
  },
  computed:{
    isActive(){
      // indexOf()返回某个指定的字符串值在字符串中首次出现的位置。  == -1 说明不存在
      return this.$route.path.indexOf(this.path) !== -1;
      // 或者用这个也行
      //  return this.$route.path === this.path; 
         
    },
    // 根据传进来的值activeColor 给文字动态绑定style
    activeStyle(){
      return this.isActive? {color:this.activeColor}:{}
    }
  },
  methods:{
    itemClick() {
      console.log('itemClick')
      this.$router.replace(this.path).catch(err=>{})
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    height: 25px;
    width: 25px;
    vertical-align: middle;
  }

 
</style>
