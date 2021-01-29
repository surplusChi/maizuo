import Vue from 'vue'
import Vuex from 'vuex'
import CityModule from './module/CityModule'
import TabbarModule from './module/TabbarModule'
import CinemaModule from './module/CinemaModule'
import createPersistedState from 'vuex-persistedstate' // 引入vuex持久化模块
Vue.use(Vuex)

// 导出vuex.store，可以通过共享状态实现通信
export default new Vuex.Store({
  plugins: [createPersistedState()], // vuex的异步数据持久化
  // 存放共享状态
  state: {
  },
  // 同步共享状态(通信)--在集中修改工作状态，也已经被监控了，在浏览器的vue插件中记录每次改变的记录
  // 集中式修改公共状态，当其他页面触发commit提交方法，就会遍历mutations中所有方法，找到同名方法，进行修改
  mutations: {
  },
  // vuex 异步操作，请求数据并进行缓存
  actions: {
  },
  // 各个模块
  modules: {
    CityModule,
    TabbarModule,
    CinemaModule
  }
})
