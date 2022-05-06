<template>
  <div class="bottom-bar">
    <div class="check-content"> 
      <check-button 
      :is-checked="isSelectAll" 
      class="check-button" 
      @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate">
      去计算：({{checkedLength}})
    </div>
    
  </div>
</template>

<script>
import CheckButton from 'components/common/checkbutton/CheckButton'
import { mapActions, mapGetters } from 'vuex'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item) =>{
        return preValue + item.price * item.count
      },0)
    },
    checkedLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length ===0 ) return false
      // 1.使用filter
      // return !(this.cartList.filter(item=>!item.checked).length)

      // 2.使用find
      return !this.cartList.find(item=>!item.checked)

      // 3.普通遍历
      // for(let item of this.cartList){
      //   if(!item.checked){
      //     return false
      //   }
      // }
      // return true

    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    font-size: 14px;
  }

  .check-content{
    display: flex;
    text-align: center;
    align-items: center;
    margin-left: 15px;
    width: 60px;
  }

  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    
  }

  .check-content span{
    margin-left: 6px;
  }

  .total-price{
    margin-left:30px ;
    flex: 1;
  }

  .calculate{
    width: 90px;
    color: #fff;
    background-color: red;
    text-align: center;
  }
</style>