<template>
    <div class="filmheader">
        <div class="header" v-show="isShow" @click="handleClick">
            <div class="cityName">{{cityName}}<van-icon name="arrow-down" color="black" /></div>
            <div class="cinema">电影</div>
        </div>
        <ul>
            <router-link to="/film/nowplaying" tag="li" active-class="fimlactive">
                正在热映
            </router-link>
            <router-link to="/film/comingsoon" tag="li" active-class="fimlactive">
                即将上映
            </router-link>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
import { mapMutations, mapState } from 'vuex'
Vue.use(Icon)
export default {
  data () {
    return {
      scrollY: '',
      isShow: false
    }
  },
  computed: {
    ...mapState('CityModule', ['cityName'])
  },
  methods: {
    ...mapMutations('CinemaModule', ['clearCinemaList']),
    menu () {
      this.scrollY = window.scrollY
      if (this.scrollY > 250) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      // console.log(this.scrollY)
    },
    handleClick () {
      // 点击切换城市按钮，清空cinemaList的缓存
      this.clearCinemaList()
      this.$router.push('/city')
    }
  },
  mounted () {
    window.addEventListener('scroll', this.menu)
  }
}
</script>

<style lang="scss" scoped>
    .filmheader{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        .header{
            width: 100%;
            height: 50px;
            position: relative;
            .cityName{
                display: inline-block;
                position: absolute;
                left: 10px;
                width: 50px;
                color: #2c3e50;
                font-size: 12px;
            }
            .cinema{
                display: inline-block;
                width: 260px;
                color: #2c3e50;
                font-size: 17px;
                text-align: center;
            }
        }
        ul{
          display: flex;
          li{
            flex: 1;
            background-color: white;
          }
    }
    }
    .fimlactive{
        color: orange;
        border-bottom: 2px solid orange;
    }
</style>
