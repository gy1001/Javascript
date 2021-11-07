import Vue from 'vue'
import Vuex from 'vuex'
import form from './modules/form'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    languages: 'ZN',
  },
  mutations: {
    changeLang(state, payload) {
      //state.languages = payload
      state = Object.assign(state, { languages: payload })
    },
  },
  actions: {},
  modules: {
    form,
  },
})
