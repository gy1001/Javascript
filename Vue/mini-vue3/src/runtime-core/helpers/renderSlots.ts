import { Fragment, createVNode } from '../vnode'

export function renderSlots(slots, name, props) {
  const slot = slots[name]
  if (slot) {
    // 如果slot是一个函数，则调用该函数并返回结果：作用域插槽
    if (typeof slot === 'function') {
      return createVNode(Fragment, { id: 'slot' }, slot(props))
    }
    return createVNode(Fragment, {}, slot)
  }
  return createVNode(Fragment, {}, slots)
}
