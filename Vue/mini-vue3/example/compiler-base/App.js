import { ref } from '../../lib/guide-mini-vue.esm.js'

export const App = {
  name: 'App',
  template: '<div>hi, {{message}}</div>',
  setup() {
    const message = ref('mini-vue')
    setTimeout(() => {
      message.value = 'Vue3'
    }, 2000)
    return {
      message,
    }
  },
}
