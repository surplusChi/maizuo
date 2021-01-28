<template>
    <div>
      <van-nav-bar title="影院" @click-left="handleLeft()" @click-right="handleRight()">
        <template #left>
          {{cityName}}<van-icon name="arrow-down" color="black" />
        </template>
        <template #right>
          <van-icon name="search" size="25" color="black" />
        </template>
      </van-nav-bar>

      <div class="cinema" v-height>
          <ul>
              <li v-for="data in cinemaList" :key="data.cinemaId">
                  <div class="cinema-info-lf">
                      <span class="name">{{data.name}}</span>
                      <span class="address">{{data.address}}</span>
                  </div>
                  <div class="cinema-info-rt">
                      <span class="lowprice">￥{{data.lowPrice / 100}}起</span>
                      <span class="distance">距离未知</span>
                  </div>
              </li>
          </ul>
      </div>
    </div>
</template>

<script>
// 下载组件betterScroll，使长列表滚动更加丝滑 npm i --save better-scroll
import BetterScroll from 'better-scroll'
import Vue from 'vue'
import { NavBar, Icon } from 'vant' // 引入vant的navbar组件，做顶部导航栏
import { mapActions, mapMutations, mapState } from 'vuex'
Vue.use(NavBar).use(Icon) // 全局注册组件

// 定义一个height指令，给容器一个自适应屏幕的高度
Vue.directive('height', {
  inserted (el) {
    el.style.height = document.documentElement.clientHeight - 96 + 'px'
  }
})
export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('CinemaModule', ['getCinemaList']),
    ...mapMutations('CinemaModule', ['clearCinemaList']),
    handleLeft () {
      // 点击切换城市按钮，清空cinemaList的缓存
      // this.$store.commit('clearCinemaList') 单文件写法
      this.clearCinemaList()
      this.$router.push('/city')
    },
    handleRight () {
      this.$router.push('/cinema/search')
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaList']),
    ...mapState('CityModule', ['cityId', 'cityName'])
  },
  mounted () {
    // 影院列表数据，通过vuex的异步流程请求或者拿vuex的缓存数据
    if (this.cinemaList.length === 0) {
      // vuex 异步流程
      this.getCinemaList(this.cityId).then(res => {
        // 初始化组件，进行滚动
        this.$nextTick(() => {
          new BetterScroll('.cinema', { // 初始化组件
            scrollbar: { // 加一个滚动条
              fade: true // 不滚动就隐藏滚动条
            }
          })
        })
      })
    } else {
      // console.log('缓存')
      // 初始化组件，进行滚动
      this.$nextTick(() => {
        new BetterScroll('.cinema', { // 初始化组件
          scrollbar: { // 加一个滚动条
            fade: true // 不滚动就隐藏滚动条
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .cinema{
        overflow: hidden; // BetterScroll组件需要容器确定高度，并且多出内容进行隐藏
        position: relative; // 加一个相对定位，让滚动条的位置更合理
    }
    li{
        border-bottom: 1px solid #e4eaf1;
        display: flex;
        overflow: hidden;
        padding: 15px;
        height: 50px;
        width: 100%;
        .cinema-info-lf{
            display: inline-block;
            left: 0px;
            height: 50px;
            width: 305px;
            padding-right: 15px;
            .name{
                display: block;
                color: #191a1b;
                font-size: 15px;
            }
            .address{
                display: block;
                width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #797d82;
                font-size: 12px;
                margin-top: 5px;
            }
        }
        .cinema-info-rt{
            width: auto;
            padding-right: 10px;
            height: 50px;
            float: right;
            right: 0px;
            .lowprice{
                padding-left: 5px;
                width: 42px;
                height: 25px;
                color: #ff5f16;
                font-size: 12px;
            }
            .distance{
                font-weight: 400;
                display: block;
                margin-top: 5px;
                font-size: 14px;
                color: #797d82;
            }
        }
    }
</style>
