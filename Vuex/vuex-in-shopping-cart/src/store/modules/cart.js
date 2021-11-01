import shop from '../../api/shop'

export default {
  namespaced: true,

  actions: {
    addToCart({ state, commit }, payload) {
      if (payload.inventory > 0) {
        const cartItem = state.items.find(item => item.id === payload.id)
        if (cartItem) {
          commit('increaseItem', { id: payload.id })
        } else {
          commit('pushToCart', { id: payload.id })
        }
        commit(
          'products/decreaseProductInventory',
          { id: payload.id },
          { root: true }
        )
      }
    },

    submit({ commit, state }, payload) {
      console.log(payload)
      const savedCartItems = [...state.items]
      commit('setCheckOutStatus', null)
      commit('setCartItem', { items: [] })
      shop.buyProducts(
        payload,
        () => commit('setCheckOutStatus', 'success'),
        () => {
          commit('setCheckOutStatus', 'failed')
          commit('setCartItem', { items: savedCartItems })
        }
      )
    }
  },

  mutations: {
    pushToCart(state, payload) {
      state.items.push({
        id: payload.id,
        quantity: 1
      })
    },

    increaseItem(state, payload) {
      const cartItem = state.items.find(item => item.id === payload.id)
      cartItem.quantity++
    },

    setCheckOutStatus(state, payload) {
      state.checkoutStatus = payload
    },

    setCartItem(state, payload) {
      state.items = payload.items
    }
  },

  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map(({ id, quantity }) => {
        const product = rootState.products.all.find(item => item.id === id)
        return {
          title: product.title,
          price: product.price,
          quantity
        }
      })
    },
    cartTotalPrice(state, getters) {
      return getters.cartProducts.reduce((total, next) => {
        return total + next.price * next.quantity
      }, 0)
    }
  },
  state: {
    items: [],
    checkoutStatus: null
  }
}
