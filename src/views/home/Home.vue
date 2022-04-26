<template>
  <!-- <h2>主页</h2> -->
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp= "loadMore">
      <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="titles" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
   
  </div> 

</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'

export default {
  name:'Home',
  components:{
    
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop

  },
  data(){
    return {
      banners:[],
      recommends:[],
      titles:['流行','新款','精选'],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShow:false
    }
  },
  created(){
    // 1.请求多个数据
    this.getHomeMultidata()    

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,50)

    // 3. 监听item中的图片加载完成
    this.$bus.$on('itemImageLoad',()=>{
      // console.log('-----')
      // this.$refs.scroll.refresh()
      refresh()
    })
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    /**
     *事件监听相关的方法
    */
  //  debounce(func,delay){
  //    let timer = null

  //    return function(...args){
  //      if(timer) clearTimeout(timer)
  //      timer = setTimeout(()=>{
  //        func.apply(this,args)
  //      },delay)
  //    }
  //  },
   tabClick(index){
     console.log(typeof index)
     switch (index){
      case 0:
        this.currentType = 'pop'
        break;
      case 1:
        this.currentType = 'new'
        break;
      case 2:
        this.currentType = 'sell'
        break;
     }

   },
   backClick(){
     console.log('backClick')
     this.$refs.scroll.scrollTo(0,0)
   },
   contentScroll(position){
      // console.log(position)     
      this.isShow = (-position.y)>1000    
   },
   loadMore(){
     console.log('上拉加载更多')
     this.getHomeGoods(this.currentType)

    //  重新计算可滚动的区域,因为图片异步加载完成需要一段时间，
    // 所以最开始计算出来的高度，没算上图片高度，太小了
    this.$refs.scroll.refresh()
   },

    /**
     * 网络请求相关的方法
    */
    getHomeMultidata(){
      getHomeMultidata().then(res=>{   
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        console.log(res.data)
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page +1 
      getHomeGoods(type,page).then(res=>{
        console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1 

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  
  z-index: 100;
}

.tab-control{
  position: sticky;
  top: 44px;
  z-index: 100;
}

/* 方案2 */
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* bs方案1 */
/* .content{
  height: calc(100%-93px);
  overflow: hidden;
  margin-top:44px ;
} */
</style>