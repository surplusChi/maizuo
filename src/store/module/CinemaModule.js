import http from '@/util/http.js'
const module = {
  namespaced: true, // 命名空间
  state: {
    cinemaList: [] // 影院列表数据
  },

  mutations: {
    setCinemaList (state, cinemaList) {
      state.cinemaList = cinemaList
    },
    clearCinemaList (state) {
      state.cinemaList = [] // 清空cinema列表缓存
    }
  },

  actions: {
    getCinemaList (store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=2907619`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        // console.log(res.data)
        // 拿到想要的数据，并通过监控修改公共状态
        store.commit('setCinemaList', res.data.data.cinemas)
      })
    }
  }
}

export default module
