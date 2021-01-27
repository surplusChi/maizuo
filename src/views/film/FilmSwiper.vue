<template>
    <div class="swiper-container app">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
// 下载swiper库，来实现轮播 npm i --save swiper
import Swiper from 'swiper/bundle' // 这只引入了swiper.js文件
import 'swiper/swiper-bundle.min.css'
export default {
  data () {
    return {

    }
  },
  mounted () {
    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
    .app{
        height: 200px;
        background: white;
    }
</style>
