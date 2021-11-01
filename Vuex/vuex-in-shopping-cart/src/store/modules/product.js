import shop from '../../api/shop'

export default {
  namespaced: true,
  state: {
    all: []
  },
  getters: {},
  mutations: {
    set_products(state, payload) {
      state.all = payload
    },
    decreaseProductInventory(state, payload) {
      const product = state.all.find(item => item.id === payload.id)
      product && product.inventory--
    }
  },
  actions: {
    getAllProducts({ commit }) {
      shop.getProducts(products => {
        commit('set_products', products)
      })
    }
  }
}
