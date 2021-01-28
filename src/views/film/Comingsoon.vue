<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="我是有底线的"
            :immediate-check = "false"
        >
          <van-cell v-for="data in comingsoonList" :key="data.filmId" >
              <img :src="data.poster" >
              <h3 class="soonname">
                  <span class="name">{{data.name}}</span>
                  <span class="itme">{{data.filmType.name}}</span>
              </h3>
              <div class="actors">主演:{{data.actors | actorsFilter}}</div>
              <div class="premiereAt">上映时间:{{data.premiereAt | dateFilter}}</div>
          </van-cell>
        </van-list>
    </div>
</template>

<script>
import http from '@/util/http.js'
import { mapState } from 'vuex'
import Vue from 'vue'
import moment from 'moment'
import { List, Cell } from 'vant' // 引入Vant库中的所需组件，引入时首字母大写，使用时van-...
Vue.use(List).use(Cell) // 全局注册
Vue.filter('actorsFilter', (actors) => {
  // 过滤器actorsFilter先判断是否有演职人员信息，再进行映射加工
  if (actors === undefined) {
    return '暂无主演'
  }
  return actors.map(itme => itme.name).join(' ')
})
Vue.filter('dateFilter', (date) => {
  // 日期处理， 使用moment库来实现
  return moment(date * 1000).format('周d M月DD日') // 日期显示格式
})
export default {
  data () {
    return {
      loading: false,
      finished: true,
      comingsoonList: []
    }
  },
  computed: {
    ...mapState('CityModule', ['cityId'])
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=7173629`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
      // method: "get" 默认get请求
    }).then(res => {
      // console.log(res.data.data.films)
      this.comingsoonList = res.data.data.films
    })
  }
}
</script>

<style lang="scss" scoped>
    *{
      margin: 0px;
      padding: 0px;
    }
    .van-list{
      .van-cell{
        position: relative;
        left: 0px;
        padding: 15px 15px 15px 20px;
        margin: 0px;
        overflow: hidden;
        width: 100%;
        height: 160px;
        border-bottom: 1px solid #e4eaf1;
        .van-cell__value{
          position: relative;
          left: 0px;
          width: 100%;
          height: 100%;
          margin: 0px;
          padding: 0px;
        }
        img{
          float: left;
          width: 85px;
        }
        .name{
          font-size: 16px;
          color: #191a1b;
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
        h3{
          position: absolute;
          left: 100px;
        }
        div{
          font-size: 13px;
          color: #797d82;
          position: absolute;
          left: 100px;
        }
        .soonname{
            top: 10px;
        }
        .actors{
            top: 50px;
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .premiereAt{
            top: 80px;
        }
      }
    }
</style>
