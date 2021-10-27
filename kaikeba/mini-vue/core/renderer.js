export function mountElement(vNode, elContainer) {
  // 如果把 object -> 真实的element
  const { type, props, children } = vNode
  const el = (vNode.el = document.createElement(type))
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

export function diff(oldVNode, newVNode) {
  if (oldVNode.type !== newVNode.type) {
    // 直接替换
    oldVNode.el.replaceWith(document.createElement(newVNode.type))
  } else {
    // 类型一致
    // props
    // 1. oldProps :{id:1} newProps:{id:2}
    // 2. oldProps :{id:1,class:2} newProps:{id:2}
    const { props: newProps } = newVNode
    const { props: oldProps } = oldVNode
    const oldEl = (newVNode.el = oldVNode.el)
    for (const key in newProps) {
      if (Object.hasOwnProperty.call(newProps, key)) {
        const newPropVal = newProps[key]
        if (newPropVal !== oldProps[key]) {
          // 更新新属性
          oldEl.setAttribute(key, newPropVal)
        }
      }
    }

    for (const key in oldVNode) {
      if (Object.hasOwnProperty.call(oldVNode, key)) {
        if (!(key in newProps)) {
          // 删除属性
          oldEl.removeAttribute(key)
        }
      }
    }

    // children
    // 1. newChildren 是 string, oldChildren 是string | array
    // 2. newChildren 是 array, oldChildren 是string | array
    const { children: newChildren } = newVNode
    const { children: oldChildren } = oldVNode
    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        if (newChildren !== oldChildren) {
          oldEl.textContent = newChildren
        }
      } else if (Array.isArray(oldChildren)) {
        oldEl.textContent = newChildren
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === 'string') {
        oldEl.textContent = ''
        newChildren.forEach(newChild => {
          mountElement(newChild, oldEl)
        })
      } else if (Array.isArray(oldChildren)) {
        // 新旧都是 array
        // 1: 新旧部分位置不一样 new :[a,b,c,d] old :[a,b,c,f]
        // 2: 新比旧的多 (新建) new :[a,b,c,d] old :[a,b,c,d,e]
        // 3: 新比旧的少（删除） new :[a,b,c,d] old :[a,b,c]
        const length = Math.min(oldChildren.length, newChildren.length)
        for (let index = 0; index < length; index++) {
          diff(oldChildren[index], newChildren[index])
        }
        if (newChildren.length > length) {
          // 新的节点多
          for (let j = length; j < newChildren.length; j++) {
            mountElement(newChildren[j], oldEl)
          }
        } else {
          // 新的节点少
        }
      }
    }
  }
}
