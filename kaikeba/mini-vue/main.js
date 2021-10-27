console.log('main.js')
// 第一小步
// 依赖收集 和 触发依赖
//import { ref, effect } from './node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'

//// 组件
//// 响应式数据
//const App = {
//  setup() {
//    // vue3
//    let count = ref(10)
//    window.count = count
//    return {
//      count
//    }
//  },

//  render(setupState) {
//    // 依赖
//    effect(() => {
//      const rootContainer = document.createElement('div')
//      rootContainer.textContent = 'nihao' + setupState.count.value

//      const app = document.getElementById('app')
//      app.innerHTML = ''
//      app.appendChild(rootContainer)
//    })
//  }
//}
//App.render(App.setup())

// 第二小步进行升级

import { createApp } from './core/index.js'
createApp(App).mount('#app')
