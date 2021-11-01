import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/product'
import cart from './modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: { email: 'xxxx@163.com' }
  },
  modules: {
    products,
    cart
  }
})
