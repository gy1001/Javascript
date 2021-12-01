import { createRenderer } from '@vue/runtime-core'

import { Graphics, Text } from 'pixi.js'
const renderer = createRenderer({
  createElement(type) {
    let element
    if (type === 'rect') {
      element = new Graphics()
      element.beginFill(0xff0000)
      element.drawRect(0, 0, 500, 500)
      element.endFill()
    } else if (type === 'circle') {
      element = new Graphics()
      element.beginFill(0xffff00)
      element.drawCircle(0, 0, 50) // 50是半径
      element.endFill()
    }
    return element
  },

  createText(text) {
    return new Text(text)
  },

  insert(el, parent) {
    console.log('el-parent', el, parent)
    parent.addChild(el)
  },

  setElementText(node, text) {
    const cText = new Text(text)
    node.addChild(cText)
  },

  patchProp(el, key, prevValue, nextValue) {
    // PIXI el.x = value el.y = value
    console.log(el, key, prevValue, nextValue)
    el[key] = nextValue
  },
})

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent)
}
