const module = {
  namespaced: true, // 命名空间
  state: {
    isTabbvarShow: true // 控制底部选项卡显示隐藏
  },

  mutations: {
    Show (state) {
      state.isTabbvarShow = false
    },
    Hide (state) {
      state.isTabbvarShow = true
    }
  },

  actions: {

  }
}

export default module
