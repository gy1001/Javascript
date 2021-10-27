import { ref, h } from './core/index.js'
export const App = {
  setup() {
    let count = ref(10)
    window.count = count
    return {
      count
    }
  },
  render(setupState) {
    //const rootContainer = document.createElement('div')
    //rootContainer.textContent = 'nihao' + setupState.count.value
    //return rootContainer

    // 转换为虚拟节点
    return h('div', {}, [h('p', {}, 'p1:' + setupState.count.value), h('p', {}, 'p2')])
  }
}
