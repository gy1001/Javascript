import { createRender } from '../runtime-core/index'

function createElement(type) {
  return document.createElement(type)
}

function pathProp(el, key, value) {
  const isOn = (key) => /^on[A-Z]/.test(key)
  if (isOn(key)) {
    const eventName = key.slice(2).toLowerCase()
    el.addEventListener(eventName, value)
  } else {
    if (value === undefined || value === null) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, value)
    }
  }
}

// anchor: 插入指定锚点的位置前面
function insert(child, parentContainer, anchor) {
  // anchor 为空时，就是插入到最后
  parentContainer.insertBefore(child, anchor || null)
}
const remove = (child) => {
  const parent = child.parentNode
  if (parent) {
    parent.removeChild(child)
  }
}
function setElementText(el, text) {
  el.textContent = text
}

const renderer: any = createRender({
  createElement,
  patchProp: pathProp,
  insert,
  remove,
  setElementText,
})

export function createApp(...args) {
  return renderer.createApp(...args)
}
export * from '../runtime-core'
