<template>
    <v-touch v-on:swiperight="onSwipeRight">
      <div v-if="filminfo" id="detali">
        <span id="fallback" @click="handleFallback"><van-icon name="arrow-left" size="30" /></span>
        <detali-header v-top :title="filminfo.name">
        </detali-header>
        <div :style=" {backgroundImage:'url('+filminfo.poster+')'} "
                style="height: 200px; background-size: cover; background-position: center"
          ></div>
        <div class="film-detali" :class="isShow ? '' : 'detalis'">
          <div class="filmname">
              <span class="name">{{filminfo.name}}</span>
              <span class="itme">{{filminfo.filmType.name}}</span>
          </div>
          <span class="grade">{{filminfo.grade}}分</span>
          <div class="category">{{filminfo.category}}</div>
          <div class="premiereAt">{{filminfo.premiereAt | dateFilter}}上映</div>
          <div class="nation">{{filminfo.nation}} | {{filminfo.runtime}}分钟</div>
          <div class="to">
              <div class="synopsis" :class="isShow ? '': 'show'">
                {{filminfo.synopsis}}
              </div>
              <div style="text-align: center;">
                <van-icon :name="isShow? 'arrow-up' : 'arrow-down'" @click="isShow = !isShow"/>
              </div>
          </div>
        </div>

        <div class="detali-actors">
          <div class="actors-photos">演职人员</div>
          <detali-swiper :perslide= "4" swiperclass = "swiper-actors">
            <div class="swiper-slide" v-for="(data,index) in filminfo.actors" :key="index">
              <img :src="data.avatarAddress" >
              <span>{{data.name}}</span>
              <span>{{data.role}}</span>
            </div>
          </detali-swiper>
        </div>

        <div class="detali-photos">
          <div class="actors-photos">剧照</div>
          <div class="photos-length">全部({{filminfo.photos.length}})></div>
          <detali-swiper :perslide= "2" swiperclass = "swiper-photos">
            <div class="swiper-slide" v-for="(data,index) in filminfo.photos" :key="index"
            @click="handlePhotos(index)">
              <img :src="data" >
            </div>
          </detali-swiper>
        </div>

        <div class="goSchedule">选座购票</div>
      </div>
    </v-touch>
</template>

<script>
import Vue from 'vue'
import http from '@/util/http.js' // 别名，@ ==》src的绝对路径，自己封装的一个axios请求
// 下载moment组件 npm i--save moment ；用于处理时间日期的一个库
import moment from 'moment'
import detaliSwiper from './detali/DetaliSwiper'
import detaliHeader from './detali/DetaliHeader'

import { ImagePreview, Icon } from 'vant' // 引入vant组件库的图片预览的小插件和icon图标组件
import { mapMutations } from 'vuex' // 映射方法，切割方饭

import VueTouch from 'vue-touch' // 引入手势库
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(Icon) // 将图标组件全局注册

Vue.filter('dateFilter', (date) => {
  // 日期处理， 使用moment库来实现
  return moment(date * 1000).format('YYYY-MM-DD') // 日期显示格式
})
// 定义指令 v-top 对顶部栏的滑动显示和隐藏的一个指令，滑动距顶部高度为50px就显示，小于就隐藏
Vue.directive('top', {
  inserted (el) {
    // console.log(el)
    el.style.display = 'none'
    window.onscroll = () => {
      // console.log(111)
      if ((document.body.scrollTop || document.documentElement.scrollTop) > 50) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null // 销毁指令
  }
})
export default {
  data () {
    return {
      filminfo: null,
      isShow: false
    }
  },
  methods: {
    ...mapMutations('TabbarModule', ['Show', 'Hide']),
    handleFallback () {
      // 点击返回箭头，就路由到首页列表去
      this.$router.push('/film/nowplaying')
    },
    handlePhotos (index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,
        loop: false, // 是否无线轮播
        closeable: true, // 是否启用关闭小按钮
        closeIconPosition: 'top-left' // 关闭按钮位置
      })
    },
    onSwipeRight () {
      console.log('right')
      this.$router.back()
    }
  },
  components: {
    detaliSwiper, // 注册组件
    detaliHeader
  },
  mounted () {
    // this.$route 获取当前匹配路由对象信息,this.$route.params.myid可以获取动态路由站位的myid
    // 再通过ajax请求数据，挂载到页面就能完成效果了
    // 1-通过动态路由，获取想要的路由对象，拿到id
    // console.log('利用获取的id，ajax请求后端接口', this.$route.params.myid)

    // 2-通过query方式来获取id
    // console.log('利用获取的id，ajax请求后端接口', this.$route.query.id)

    // 进入详情页面，隐藏底部选项卡
    // this.$store.commit('TabbarShow') 单页面写法
    this.Show()
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=2585447`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res.data.data.film)
      this.filminfo = res.data.data.film
    })
  },
  beforeDestroy () {
    // 离开详情页面，就显示选项卡
    // this.$store.commit('TabbarShow') 单页面写法
    this.Hide()
  }
}
</script>

<style lang="scss" scoped>
  #detali{
    background: #f7f8fa;
    #fallback{
      display: block;
      position: fixed;
      top: 5px;
      left: 5px;
      width: 35px;
      height: 35px;
      z-index: 99;
      background-color: white;
      border-radius:50px;
      opacity: 0.4;
    }
    .film-detali{
      background: #fff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 15px;
      min-height: auto;
      .filmname{
        flex: 1;
        .name{
          color: #191a1b;
          font-size: 18px;
          height: 24px;
          line-height: 24px;
          margin-right: 7px;
        }
        .itme{
          background-color: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 2px;
          color: #fff;
          font-size: 14px;
        }
      }
    }
    .grade{
      position:absolute;
      top: 215px;
      right: 30px;
      color: #ffb232;
      font-size: 18px;
    }
    .category{
      flex: 1;
      margin-top: 12px;
      font-size: 13px;
      color: #bcc5cf;
    }
    .premiereAt{
      flex: 1;
      margin-top: 12px;
      font-size: 13px;
      color: #797d82;
    }
    .nation{
      flex: 1;
      margin-top: 12px;
      font-size: 13px;
      color: #797d82;
    }
    .to{
      flex: 1;
      margin-top: 15px;
      .synopsis{
        font-size: 13px;
        color: #797d82;
        width: auto;
        padding-right: 15px;
      }
    }
    .detali-actors{
      margin-top: 10px;
      height: 250px;
      background: #fff;
      span{
        padding-top: 5px;
        text-align: center;
        font-size: 12px;
        color: #191a1b;
        width: 85px;
        height: auto;
        display: block;
      }
    }
    .detali-photos{
      margin-top: 10px;
      height: 250px;
      background: #fff;
      .photos-length{
        position: absolute;
        right: 15px;
        top: 683px;
        font-size: 13px;
        color: #797d82;
      }
    }
    .goSchedule{
      position: fixed;
      bottom: 0;
      left: 0;
      height: 50px;
      width: 100%;
      text-align: center;
      background-color: #ff5f16;
      color: #fff;
      font-size: 16px;
      line-height: 50px;
      z-index: 99;
    }
  }
  .detalis{
    height: 170px;
  }
  .show{
    height: 35px;
    overflow: hidden;
  }
  .actors-photos{
    padding: 15px;
    color: #2c3e50;
    font-size: 17px;
  }
</style>
