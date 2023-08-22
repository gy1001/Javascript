import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    inputValue: '',
  },
  mutations: {
    changeInputValue(state, payload) {
      state.inputValue = payload
    },
  },
})

export default store
