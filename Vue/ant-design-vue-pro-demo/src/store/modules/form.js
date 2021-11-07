const state = {
  step: {
    payAccount: '123456',
    receiveAccount: {
      type: 'alipay',
      number: '137@qq.com',
    },
  },
}

const actions = {
  async submitStepForm({ commit }, payload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟请求
        commit('saveStepFormData', payload)
        resolve()
      }, 2000)
    })
  },
}

const mutations = {
  saveStepFormData(state, { payload }) {
    console.log(payload)
    state.step = {
      ...state.step,
      ...payload,
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
