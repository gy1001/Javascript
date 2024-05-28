import { getCurrentInstance } from './component'

export function provide(key, value) {
  // 存
  const currentInstance: any = getCurrentInstance()
  if (currentInstance) {
    let { provides } = currentInstance
    const parentProvides = currentInstance.parent.provides
    // 因为初始化时父级的provides, 如果是同一个对象，说明是初始化状态
    if (provides === parentProvides) {
      provides = currentInstance.provides = Object.create(parentProvides)
    }
    provides[key] = value
  }
}

export function inject(key, defaultValue) {
  const currentInstance: any = getCurrentInstance()
  if (currentInstance && currentInstance.parent) {
    const parentProvides = currentInstance.parent.provides
    if (parentProvides[key]) {
      return parentProvides[key]
    }
    if (typeof defaultValue === 'function') {
      defaultValue = defaultValue()
    }
    return defaultValue
  }
}
