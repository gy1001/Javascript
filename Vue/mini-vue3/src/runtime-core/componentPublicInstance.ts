import { hasOwn } from '../shared/index'

const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
  $slots: (i) => i.slots,
  $props: (i) => i.props,
  // 后续还有 $data $props 等
}

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    // setUpState

    const { setupState, props } = instance
    if (hasOwn(setupState, key)) {
      return setupState[key]
    }

    // props
    if (hasOwn(props, key)) {
      return props[key]
    }

    if (key in publicPropertiesMap) {
      return publicPropertiesMap[key](instance)
    }
  },
}
