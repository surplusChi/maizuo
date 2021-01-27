import Vue from 'vue'/* 载入vue模块 */
import App from './App.vue'/* 将app.vue组件载入进来 */
import router from './router'/* 路由配置，配置在router文件中的index.js */
import store from './store'

Vue.config.productionTip = false

new Vue({
  router, // 以后使用路由就直接：this.$router
  store, // 要访问或者修改store中的共享属性： this.$store
  render: h => h(App)
}).$mount('#app')
/* 将app组件渲染挂载到#app标签中渲染到页面上 */
