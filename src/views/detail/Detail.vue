<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
    
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'

import Scroll from 'components/common/scroll/Scroll' 

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll,
    
  },
  data(){
    return{
      iid:null,
      topImages:null,
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{}
    }      
    },

  created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      console.log(res)
      const data =res.result
      // 1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 3.获取店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
    })
  
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content{
  height: calc(100% - 44px);
}
</style>
