<template>
    <div>
      <!-- immediate-check默认是true，在初始化的时候执行onLoad回调函数，设成false就不会初始化执行了 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="我是有底线的"
          @load="onLoad"
          :immediate-check = "false"
        >
            <van-cell v-for="data in datalist" :key="data.filmId" @click="handleClick(data.filmId)">
                <img :src="data.poster" >
                <h3 class="nowname">
                    <span class="name">{{data.name}}</span>
                    <span class="itme">{{data.filmType.name}}</span>
                </h3>
                <div class="grade">观众评分:{{data.grade}}</div>
                <div class="actors">主演:{{data.actors | actorsFilter}}</div>
                <div class="nation">{{data.nation}} | {{data.runtime}}分钟</div>
                <button disabled="true">购票</button>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import http from '@/util/http.js'
import { mapState } from 'vuex'
import Vue from 'vue'
import { List, Cell } from 'vant' // 引入Vant库中的所需组件，引入时首字母大写，使用时van-...
Vue.use(List).use(Cell) // 全局注册
Vue.filter('actorsFilter', (actors) => {
  // 过滤器actorsFilter先判断是否有演职人员信息，再进行映射加工
  if (actors === undefined) {
    return '暂无主演'
  }
  return actors.map(itme => itme.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false, // 是否正在加载中,放在多次触发
      finished: false, // 是否已经加载结束
      current: 1, // 记录第几页数据
      total: 0 // 数据总长度
    }
  },
  computed: {
    ...mapState('CityModule', ['cityId'])
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=3315693`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
      // method: "get" 默认get请求
    }).then(res => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total // 得到数据总长度
    })
  },
  methods: {
    onLoad () { // 当列表拉到底部，会触发这个回调函数，实现懒加载
      if (this.datalist.length === this.total && this.datalist.length !== 0) {
        // 当数据总长度等于当前数组的长度时，就不再加载，也不再执行ajax请求，显示底部文字
        this.finished = true
        return
      }
      // console.log('到底了')

      // 1.ajax请求新页面数据
      // 2.合并新数据到老数据中去
      // 3.this.loading = false(因为数据到底了，就会设成true，不修改它的值就会一直在加载中)
      this.current++
      http({
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=3315693`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
        // method: "get" 默认get请求
      }).then(res => {
        // console.log(res.data.data.films)
        this.datalist = [...this.datalist, ...res.data.data.films]
        // [...data1, ...data2],是将两个数据合成一个数据的方法，es6的展开方法

        this.loading = false
      })
    },
    handleClick (id) {
      // console.log(id)
      // location.href = '#/center'

      // 1-拼接路由路径，进行跳转导航，通过每个电影的id来获取不同电影详情信息
      this.$router.push(`/detali/${id}`)
      // 编程式导航   this.$router路由大对象，router在路由配置中已经实例化了

      // 2-通过路由名，查找跳转
      /* this.$router.push({
        name: 'liuchidatali',
        params: {
          myid: id
        }
      }) */

      // 3-query方式跳转，不需要配置动态路由，配置一个普通一级路由就可以用
      /* this.$router.push(`/datali?id=${id}`) */
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-list{
    .van-cell{
      position: relative;
      padding: 15px 0px 15px 20px;
      margin: 0px;
      overflow: hidden;
      width: 380px;
      height: 190px;
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
        width: 100px;
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
        top: 20px;
        left: 120px;
      }
      div{
        font-size: 15px;
        color: #797d82;
        position: absolute;
        left: 120px;
      }
      button{
        position: absolute;
        right: 0px;
        top: 70px;
        border: 1px solid #ff5f16;
        width: 50px;
        height: 25px;
        background: white;
        color: #ff5f16;
      }
    }
  }
  .actors{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    top: 85px;
    width: 210px;
  }
  .grade{
    top: 55px;
  }
  .nation{
    top: 110px;
  }
</style>
