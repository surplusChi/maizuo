<template>
  <!-- <v-touch v-on:swiperight="onSwipeRight"> -->
    <div>
        <van-search
            v-model="value"
            show-action
            placeholder="输入影院名称"
            @cancel="handleBack"
        />
        <ul>
            <li v-for="data in computedCinemaList" :key="data.cinemaId">
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
  <!-- </v-touch> -->
</template>

<script>
import Vue from 'vue'
import { Search } from 'vant' // 引入vant库的模糊查询组件
import { mapActions, mapMutations, mapState } from 'vuex'

/* import VueTouch from 'vue-touch' // 引入手势库
Vue.use(VueTouch, { name: 'v-touch' }) */

Vue.use(Search) // 全局注册
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaList']),
    ...mapState('CityModule', ['cityId']),
    computedCinemaList () {
      if (this.value === '') return []
      return this.cinemaList.filter(itme => itme.name.toUpperCase().includes(this
        .value.toUpperCase()) || itme.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },
  methods: {
    ...mapMutations('TabbarModule', ['Show', 'Hide']),
    ...mapActions('CinemaModule', ['getCinemaList']),
    handleBack () {
      // 路由方法：push增加新记录，back回退到上一个，replace替换当前记录
      this.$router.back()
    }
    /* onSwipeRight () {
      // console.log('right')
      this.$router.back()
    } */
  },
  mounted () {
    // 进入搜索页面隐藏底部选项卡
    // this.$store.commit('TabbarShow') 单文件写法
    this.Show()
    if (this.cinemaList.length === 0) {
      // vuex 异步流程
      this.getCinemaList(this.cityId)
    } else {
      console.log('缓存')
    }
  },
  beforeDestroy () {
    // 离开城市列表页面显示底部选项卡
    // this.$store.commit('TabbarShow') 单文件写法
    this.Hide()
  }
}
</script>

<style lang="scss" scoped>
    .van-search{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        z-index: 99;
    }
    ul{
        position: relative;
        top: 54px;
    }
    li{
        overflow: hidden;
        padding: 15px;
        height: 50px;
        width: auto;
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
            width: 64.4px;
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
