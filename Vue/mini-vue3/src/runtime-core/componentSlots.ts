import { ShapeFlags } from '../shared/ShapeFlags'

export function initSlots(instance, children) {
  // 插槽是一个对象
  const { vnode } = instance
  // 如果当前的组件是 slot 组件
  if (vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
    normalizeObjectSlots(children, instance.slots)
  }
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value]
}

function normalizeObjectSlots(children, slots) {
  for (const key in children) {
    const value = children[key]
    slots[key] = (props) => normalizeSlotValue(value(props))
  }
}
