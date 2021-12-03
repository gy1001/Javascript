import { createRenderer } from '@vue/runtime-core'

import { Graphics, Text, Container, Sprite, Texture } from 'pixi.js'
const renderer = createRenderer({
  createElement(type) {
    let element

    switch (type) {
      case 'rect':
        element = new Graphics()
        element.beginFill(0xff0000)
        element.drawRect(0, 0, 500, 500)
        element.endFill()
        break
      case 'circle':
        element = new Graphics()
        element.beginFill(0xffff00)
        element.drawCircle(0, 0, 50) // 50是半径
        element.endFill()
        break
      case 'Container':
        element = new Container()
        break
      case 'Sprite':
        element = new Sprite()
        break
      default:
        break
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

  // 处理注释
  createComment() {
    console.log('createComment')
  },

  // 获取父节点
  parentNode() {
    console.log('parentNode')
  },

  // 获取兄弟节点
  nextSibling() {
    console.log('nextSibling')
  },

  // 删除节点时候调用
  remove(el) {
    const parent = el.parent
    if (parent) {
      parent.removeChild(el)
    }
  },

  patchProp(el, key, prevValue, nextValue) {
    // PIXI el.x = value el.y = value
    console.log(el, key, prevValue, nextValue)
    switch (key) {
      case 'texture':
        el.texture = Texture.from(nextValue)
        break
      case 'onClick':
        el.on('pointertap', nextValue)
        break
      default:
        el[key] = nextValue
        break
    }
  },
})

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent)
}
