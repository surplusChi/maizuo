<template>
    <div>
      <div class="cinema-schedule">
          <div class="header-left"><van-icon name="arrow-left" size="25" /></div>
          <div class="header-title">{{cinemaInfo.name}}</div>
          <div class="cinema-info">
              <div class="tags">{{cinemaInfo.services | scheduleFilter}}
                  <van-icon name="arrow" size="15"/></div>
              <div class="address"><van-icon name="location-o" size="20"/>{{cinemaInfo.address}}
                <van-icon class="phone-o" name="phone-o" size="20"/></div>
          </div>
          <div class="film-bg">
                <film-swiper> <!-- 轮播组件 -->
                    <div class="swiper-slide" v-for="data in swiperList" :key="data.filmId">
                        <img :src="data.poster" style="height: 130px; width: 90px;" >
                    </div>
                </film-swiper>
                <van-icon class="home-o" name="home-o" color="#fff"/>
          </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import http from '@/util/http.js'
import { Icon } from 'vant' // 引入vant组件库的图片预览的小插件和icon图标组件
import filmSwiper from './schedule/ScheduleSwiper'
Vue.use(Icon) // 将图标组件全局注册

Vue.filter('scheduleFilter', (arr) => {
  if (arr === undefined) {
    return ''
  }
  return arr.map(itme => itme.name).join(' |')
})
export default {
  data () {
    return {
      cinemaInfo: '',
      swiperList: []
    }
  },
  components: {
    filmSwiper
  },
  mounted () {
    http({
      url: `/gateway/?cinemaId=${this.$route.params.cinemaId}&k=7154010`,
      headers: {
        'X-Host': 'mall.film-ticket.cinema.info'
      }
    }).then(res => {
      console.log(res.data)
      this.cinemaInfo = res.data.data.cinema
    })

    http({
      url: `/gateway/?cinemaId=${this.$route.params.cinemaId}&k=6568986`,
      headers: {
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then(res => {
      console.log(res.data)
      this.swiperList = res.data.data.films
    })
  }
}
</script>

<style lang="scss" scoped>
    .cinema-schedule{
        padding-top: 45px;
        width: 100%;
        background: #fff;
        overflow: hidden;
    }
    .header-left{
        position: fixed;
        top: 8px;
        height: 45px;
        line-height: 45px;
        padding-left: 10px;
        z-index: 99;
    }
    .header-title{
        position: relative;
        text-align: center;
        font-size: 20px;
        color: #191a1b;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        padding: 0 15px;
        background: #fff;
        top: 0;
        height: 45px;
        line-height: 45px;
        z-index: 99;
    }
    .cinema-info{
        width: 100%;
        height: 90px;
        .tags{
            text-align: center;
            justify-content: center;
            font-size: 15px;
            color: #ffb232;
            overflow: hidden;
            position: relative;
            padding: 5px 0 15px;
        }
        .address{
            position: relative;
            padding-left: 30px;
            height: 50px;
            line-height: 50px;
            font-size: 15px;
            color: #2c3e50;
            .phone-o{
                position: absolute;
                right: 20px;
                top: 13px;
            }
        }
    }
    .film-bg{
        position: relative;
        height: 160px;
        width: 100%;
        padding: 15px 0;
        overflow: hidden;
        background: gray;
    }
    .swiper-slide{
        height: 130px;
        width: 100px;
    }
    .home-o{
        position: absolute;
        bottom: 0px;
        left: 50%;
    }
</style>
