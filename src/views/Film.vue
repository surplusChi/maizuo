<template>
    <div>
        <film-swiper> <!-- 轮播组件 -->
          <div class="swiper-slide" v-for="data in imgList" :key="data">
            <div :style=" {backgroundImage:'url('+data+')'} "
              style="height: 200px; background-size: cover; background-position: center"
            ></div>
          </div>
        </film-swiper>
        <!-- 只有在vue中，组件上的class，style会自动传到组件的根节点上去 -->
        <film-header style="position:sticky;top:0px;background:#fff;z-index: 999;"></film-header>
        <router-view></router-view>
    </div>
</template>
<script>
import filmHeader from './film/FilmHeader'
import filmSwiper from './film/FilmSwiper'
export default {
  components: {
    filmHeader,
    filmSwiper
  },
  data () {
    return {
      imgList: [
        'https://p1.meituan.net/movie/ece9ff81e6f0af2c859aa151e42a33312706648.jpg@464w_644h_1e_1c',
        'https://p1.meituan.net/moviemachine/bde92658a234dc132de8d4ee589e86692754138.jpg@464w_644h_1e_1c',
        'https://p0.meituan.net/moviemachine/b1e9f4e071a3425bee50508d8b5141964990171.jpg@464w_644h_1e_1c'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
    /* #div1{
        height: 200px;
        width: 100%;
        background: yellow;
    } */
</style>
