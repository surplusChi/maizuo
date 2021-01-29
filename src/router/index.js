import Vue from 'vue'
import VueRouter from 'vue-router'
/* 导入路由文件地址 */
import Film from '../views/Film.vue'
import Cinema from '../views/Cinema.vue'
import Detali from '../views/Detali.vue'
import Login from '../views/Login.vue'
import City from '../views/City.vue'
import Search from '../views/Search.vue'
import CinemaSchedule from '../views/CinemaSchedule.vue'

import Comingsoon from '../views/film/Comingsoon.vue'
import Nowplaying from '../views/film/Nowpalying.vue'

Vue.use(VueRouter) // 注册路由 已经注册成立全局组件，router-view 可以在任何地方使用

const routes = [
  // 配置路由地址和文件
  {
    path: '/film',
    component: Film,
    children: [ /* 配置film的嵌套路由 */
      {
        path: 'comingsoon', // 简写
        component: Comingsoon
      },
      {
        path: '/film/nowplaying',
        component: Nowplaying
      },
      {
        path: '',
        redirect: '/film/nowplaying' /* 再次重定向，只要路径到film就走重定向路径 */
      }
    ]
  },
  {
    path: '/cinema/',
    component: Cinema
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/cinema/search',
    component: Search
  },
  {
    path: '/schedule/:cinemaId',
    component: CinemaSchedule
  },
  {
    path: '/center',
    // 在配置路由时，只有选择了这个路由才会加载这个组件的js代码的配置，叫做路由懒加载
    // 路由懒加载，能够在只有加载此组件的时候，才下载此组件的js代码，就能避免加载首页面要加载全部组件
    // 的js过大而造成的页面卡的问题(因为项目在发行出去后，通过npm run build会把所有组件的js代码整合成一个
    // js文件，这个时候别人访问你网页首页时，要加载全部js代码，由于太大会造成半天刷新不出页面的情况)

    // webpackChunkName: "liuchigroup": 把所有你写了这个注释语句的组件js代码放在liuchigroup一组中一起加载
    // 当是有路由懒加载后，再运行npm run build，就会生成多组js文件，需要的时候在加载
    component: () => import(/* webpackChunkName: "liuchigroup" */ '../views/Center.vue')
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/detali/:myid', // 配置动态路由，在datali/不确定的路径时，配置一个动态路由 :myid
    component: Detali,
    name: 'liuchidetali'
  },
  /* {
    path: '/datali',
    component: Datali
  }, */
  {
    /* 配置重定向，配置地址为*(通配符)时，当在地址栏不写#/地址或者是写了一些错误地址，
    因为通配符优先级最低，当上面配置的路由地址都找不到时，才会执行通配符地址，
    会自己跳转到#/film(你写的redirect的地址去)去 */
    path: '*',
    redirect: '/film'
  }
]

const router = new VueRouter({ // 实例化路由
  // mode是设置路由模式的，默认是hash模式，hash模式，在地址栏会有#号出现; history模式，地址栏不带#号
  // history模式，因为url就像真的url一样，当用户重新刷新页面，或者直接访问这个url时，就会报404错误，
  // 因此这个模式需要后端配合，在后端提供一个候选资源，当访问不到时，应返回同一个index页面
  mode: 'history',
  routes
})

// 路由拦截，导航收尾-- 每个路由在调用前都要经过这个回调函数，确认放行的路由才能正常使用，不放行就被拦截
// 全局守卫
/* router.beforeEach((to, from, next) => {
  // ...参数：from是路由从哪里来，to是路由要去哪里，next是路由是否放行挺通过

  const auth = ['/center', '/order', '/money', '/card']
  // 判断路由要去的地方包括上面数组的地址,就不放行要验证，验证通过才放行,
  // 去的地方不是数组中的地址，都放行通过
  if (auth.includes(to.fullPath)) {
    // console.log('验证token')
    if (!localStorage.getItem('token')) {
      next('./login') // 如果满足通过条件，就路由到login去
    } else {
      next()
    }
  } else {
    next()
  }
}) */

export default router // 导出路由
