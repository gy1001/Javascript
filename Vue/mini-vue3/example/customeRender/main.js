import App from './App.js'
import { createRender } from '../../lib/guide-mini-vue.esm.js'
const game = new PIXI.Application({
  width: 500,
  height: 500,
})
document.body.appendChild(game.view)

const renderer = createRender({
  createElement(type) {
    if (type === 'rect') {
      const rect = new PIXI.Graphics()
      rect.beginFill(0xff0000)
      rect.drawRect(0, 0, 100, 100)
      rect.endFill()
      return rect
    }
  },
  patchProp(el, key, value) {
    el[key] = value
  },
  insert(el, parent) {
    parent.addChild(el)
  },
})

renderer.createApp(App).mount(game.stage)
