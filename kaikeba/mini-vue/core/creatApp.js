import { effect } from '../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'
import { mountElement } from '../core/renderer.js'
export function createApp(rootComponent) {
  return {
    mount(selector) {
      const setupState = rootComponent.setup()
      effect(() => {
        const rootEl = document.querySelector(selector)
        rootEl.innerHTML = ''
        const subTree = rootComponent.render(setupState)
        mountElement(subTree, rootEl)
        //rootEl.append(element)
      })
    }
  }
}
