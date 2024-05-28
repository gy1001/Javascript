import {
  h,
  ref,
  getCurrentInstance,
  nextTick,
} from '../../lib/guide-mini-vue.esm.js'

export const App = {
  name: 'App',
  setup() {
    const count = ref(0)
    const instance = getCurrentInstance()
    const onClick = () => {
      for (let index = 0; index < 100; index++) {
        console.log('update')
        count.value = index
      }

      console.log(instance.vnode.el.innerHTML) // 这时候还是 0
      nextTick(() => {
        console.log(instance.vnode.el.innerHTML) // 这时候已经更新为 99
      })
    }
    return { count, onClick }
  },
  render() {
    const button = h(
      'button',
      {
        onClick: this.onClick,
      },
      'update',
    )
    const p = h('p', {}, 'count: ' + this.count)
    return h('div', {}, [button, p])
  },
}
