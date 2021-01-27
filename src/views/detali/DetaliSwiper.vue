<template>
    <div class="swiper-container app" :class="swiperclass">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper/bundle' // 这只引入了swiper.js文件
import 'swiper/swiper-bundle.min.css'
export default {
  props: {
    perslide: {
      type: Number,
      default: 1
    },
    swiperclass: {
      type: String,
      default: 'swiper-container'
    }
  },
  mounted () {
    new Swiper('.' + this.swiperclass, {
      slidesPerView: this.perslide, // 页面显示多个
      spaceBetween: 10, // 每个元素直接的距离
      freeMode: true
    })
  }
}
</script>

<style lang="scss" scoped>
    .swiper-wrapper img{
        width: 100%;
    }
</style>
