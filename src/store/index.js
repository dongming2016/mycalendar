import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arrangeSettings: {}
  },
  mutations: {
    setArrangeSettings (state, payload) {
      state.arrangeSettings[payload.type] = payload.setting
      console.log(state)
    }
  },
  getters: {
    getArrangeSettings (state) {
      return state.arrangeSettings
    }
  }
})
