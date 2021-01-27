<template>
  <div>
    <section>
      <!-- 路由容器，必须要预留这个路由容器，才能在页面上路由显示 -->
      <router-view></router-view>
    </section>

    <tabbar v-show="isTabbvarShow"></tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex' // export {mapState} 映射状态,切割出想要的状态
import tabbar from './components/Tabbar' // 导入tabbar组件
/* import axios from 'axios' */
// es6 模块导出
export default {
  data () {
    return {
    }
  },
  components: {
    tabbar // 注册组件
  },
  computed: {
    // ... 展开一个对象，
    // ...mapState('TabbarModule', ['isTabbvarShow'])相当于 isTabbvarShow:() => {}
    ...mapState('TabbarModule', ['isTabbvarShow'])
  },
  mounted () {
    // 1-后端配置好 cors --后端解决了跨域问题 (魅力惠网站)
    /* axios.get('http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5')
      .then(res => {
        console.log(res.data)
      }) */

    // 2-反向代理请求ajax--处理跨域问题 (猫眼电影)
    /* axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=3453D5F057C711EBA8C08581FE2D1A4E0C1026C707444C638450E6831CB14ACA&optimus_risk_level=71&optimus_code=10')
      .then(res => {
        console.log(res.data)
      }) */

    // 3-需要拼接headers的，后端地址需要拼接headers来进行验证的 (卖座电影)
    /* axios({
      url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=5208885',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16108630761187940709433345","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
      // method: "get" 默认get请求
    }).then(res => {
      console.log(res.data)
    }) */
  }
}
</script>
<style> /* scoped 会变成局部作用域来产出样式，因为加了scoped会给每个标签加一个唯一属性来标识 */
    li{
      list-style: none;
    }
    *{
      padding: 0px;
      margin: 0px;
    }
    section{
      margin-bottom: 30px;
    }
    *{
      touch-action: manipulation; /* 移动端取消双击缩放功能，解决移动端300ms的问题 */
    }
</style>
