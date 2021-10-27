export function mountElement(vNode, elContainer) {
  // 如果把 object -> 真实的element
  const { type, props, children } = vNode
  const el = document.createElement(type)
  // props
  for (const key in props) {
    if (Object.hasOwnProperty.call(props, key)) {
      const value = props[key]
      el.setAttribute(key, value)
    }
  }

  // children

  if (typeof children === 'string') {
    // 假如是text => string
    el.textContent = children
  } else if (Array.isArray(children)) {
    // 假如是array
    children.forEach(child => {
      mountElement(child, el)
    })
  }

  elContainer.append(el)

  // diff 暴力简化版
}
