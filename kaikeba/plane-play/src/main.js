// 入口文件
console.log('main.js2222')

//import { createRenderer } from '@vue/runtime-core'
//const render = createRenderer()
//console.log(render)

import { createApp } from '../core/runtime-canvas'
import App from './App'
import { getGameContainer } from './Game'

createApp(App).mount(getGameContainer())
