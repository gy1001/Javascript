import { createVNode } from './vnode'

export function createAppApi(render) {
  return function createApp(rootComponent: any) {
    return {
      mount(rootContainer) {
        // 先把组件转换为虚拟节点、
        // 后续所有的逻辑操作都会基于这个 vnode  做处理
        const vnode = createVNode(rootComponent)
        render(vnode, rootContainer)
      },
    }
  }
}
