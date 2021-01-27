<template>
    <div class="swiper-container app">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper/bundle' // 这只引入了swiper.js文件
import 'swiper/swiper-bundle.min.css'
export default {
  mounted () {
    new Swiper('.swiper-container', {
      slidesPerView: 3, // 页面显示多个
      spaceBetween: 60, // 每个元素直接的距离
      centeredSlides: true
    })
  }
}
</script>
