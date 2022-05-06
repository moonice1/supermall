<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 测试 -->
      <!-- <ul>
        <li v-for="item in $store.state.cartList">{{item}}</li>
      </ul> -->

      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="isShowToast"></toast>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import Scroll from 'components/common/scroll/Scroll' 
import GoodsList from 'components/content/goods/GoodsList'
import Toast from 'components/common/toast/Toast'

import { debounce } from 'common/utils'
import {itemListenerMixin} from 'common/mixin'
import BackTop from 'components/content/backTop/BackTop'

import {mapActions} from 'vuex'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  mixins:[itemListenerMixin],
  data(){
    return{
      iid:null,
      topImages:null,
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo: {},
      recommends:[],
      // itemImgListener:null,   //全局事件监听的保存
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      isShowBackTop:false,
      message:'',
      isShowToast:false
    }      
    },

  created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      // console.log(res)
      const data = res.result
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

      // 6.获取评论信息
      if(data.rate.list){
        this.commentInfo = data.rate.list[0]
      }


    })
  
    // 3.获取推荐数据
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })

    // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []; //先清空，不然不止4个值
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE); // js里面number的最大值
      console.log(this.themeTopYs)
    }, 100);
  },
  mounted(){
    // // 监听item中的图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh,100)

    // // 对监听的时间进行保存
    // this.itemImgListener = () =>{
    //   refresh()
    // }

    // this.$bus.$on('itemImageLoad',this.itemImgListener)

  },  
  destroyed(){
    // detail没有keep-alive，所以这里不用deactivated
    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad",this.itemImgListener)
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      this.$refs.scroll.refresh()
      // this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position){
      // console.log(position)
      // 1.获取y值
      const positionY = -position.y

      // 2.positionY和主题中值进行对比
      let length = this.themeTopYs.length
      // for(let i = 0;i<length;i++){
        // if(this.currentIndex !== i &&((i < length-1 && positionY >= this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i==length-1&&positionY >= this.themeTopYs[i]))){
        //   this.currentIndex = i
        //   console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
      // }

      for(let i = 0;i<length-1;i++){
        if(this.currentIndex !== i &&((i < length-1 && positionY >= this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]))){
          this.currentIndex = i
          console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 判断是否显示直接回到顶部
      this.isShowBackTop = positionY > 1000
    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0)
    },
    // 加入到购物车
    addToCart(){
      // 1.获取购物车需要展示的当前商品信息
      const product={}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      console.log(product)
     
      // 2.将商品添加到购物车
      // this.$store.commit('addCart',product)

      // this.$store.dispatch('addCart', product).then(res=>{
      //   console.log(res)
      // })

      // 使用了映射mapActions
      this.addCart(product).then(res=>{
        // this.isShowToast = true
        // this.message = res

        // setTimeout(()=>{
        //   this.isShowToast = false
        //   this.message = ''
        // },1500)
        // console.log(res)
      })

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
