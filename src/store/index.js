import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arrangeSettings: {},
    saveState: false
  },
  mutations: {
    setArrangeSettings (state, payload) {
      state.arrangeSettings[payload.type] = payload.setting
      console.log(state)
    },
    switchSaveState (state) {
      state.saveState = !state.saveState
    }
  },
  getters: {
    getArrangeSettings (state) {
      return state.arrangeSettings
    },
    getSaveState (state) {
      return state.saveState
    }
  }
})
