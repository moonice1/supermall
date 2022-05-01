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
    console.log('我是混入的内容')
  }
}