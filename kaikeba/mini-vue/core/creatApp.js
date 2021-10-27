import { effect } from '../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'
export function createApp(rootComponent) {
  return {
    mount(selector) {
      const setupState = rootComponent.setup()
      effect(() => {
        const element = rootComponent.render(setupState)
        const rootEl = document.querySelector(selector)
        rootEl.innerHTML = ''
        rootEl.append(element)
      })
    }
  }
}
