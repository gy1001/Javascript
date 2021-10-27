import { effect } from '../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'
import { mountElement, diff } from '../core/renderer.js'
export function createApp(rootComponent) {
  return {
    mount(selector) {
      const setupState = rootComponent.setup()
      let isMounted = false
      let prevSubTree
      effect(() => {
        if (!isMounted) {
          // init
          isMounted = true
          const rootEl = document.querySelector(selector)
          rootEl.innerHTML = ''
          const subTree = rootComponent.render(setupState)
          prevSubTree = subTree // 存储旧节点
          mountElement(subTree, rootEl)
        } else {
          // 更新 触发 diff 算法
          const newSubTree = rootComponent.render(setupState)
          //console.log('oldSubTree', prevSubTree)
          //console.log('newSubTree', newSubTree)
          diff(prevSubTree, newSubTree)
        }
      })
    }
  }
}
