<template>
  <div class="toast">
    <div v-show="show">{{message}}</div>
  </div>
</template>

<script>
export default {
name:'Toast',
props:{
  message:{
    type:String,
    default:''
  },
  show:{
    type:Boolean,
    default:false
  }
}
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  border-radius: 6px;
  color: #fff;
  background-color: rgba(0,0,0,.8);
}
</style>