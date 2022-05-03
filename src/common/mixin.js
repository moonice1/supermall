import { debounce } from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,   //全局事件监听的保存
      newRefresh:null
    }
  },
  mounted() {
    // 监听item中的图片加载完成
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
    
    // 对监听的事件进行保存
    this.itemImgListener = () => {
      this.Refresh()
    }
    this.$bus.$off("itemImageLoad", this.itemImgListener)
    // console.log('我是混入的内容')
  }
}

// export const backTopMixin = {
//   components: {
//     BackTop
//   },
//   data() {
//     return {
//       isShowBackTop:false
//     }
//   },
//   methods: {
//     backTop() {
//       this.$refs.scroll.scrollTo(0,0,300)
//     },
//     listenShowBackTop(position) {
//       this.isShowBackTop = -position.Y > BACK_POSITION
//     }
//   }
// }