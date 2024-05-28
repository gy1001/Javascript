import { effect } from '../reactivity/effect'
import { EMPTY_OBJ } from '../shared'
import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'
import { shouldUpdateComponent } from './componentUpdateUtils'
import { createAppApi } from './createApp'
import { queueJobs } from './scheduler'
import { Fragment, Text } from './vnode'

export function createRender(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
    remove: hostRemove,
    setElementText: hostSetElementText,
  } = options

  function render(vnode, container) {
    patch(null, vnode, container, null, null)
  }
  // n1 - 旧的
  // n2 - 新的
  function patch(n1, n2, container, parentComponent, anchor) {
    const { shapeFlag, type } = n2
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent, anchor)
        break
      case Text:
        processText(n1, n2, container)
        break
      default:
        // 判断 vnode 是不是一个 element 或者是 component 类型
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // 元素类型
          processElement(n1, n2, container, parentComponent, anchor)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // 处理组件 STATEFUL_COMPONENT
          processComponent(n1, n2, container, parentComponent, anchor)
        }
        break
    }
  }

  function processFragment(n1, n2, container, parentComponent, anchor) {
    mountChildren(n2.children, container, parentComponent, anchor)
  }

  function processText(n1, n2, container) {
    const { children } = n2
    const textNode = (n2.el = document.createTextNode(children))
    container.appendChild(textNode)
  }

  function processElement(n1, n2, container, parentComponent, anchor) {
    if (!n1) {
      mountElement(n1, n2, container, parentComponent, anchor)
    } else {
      patchElement(n1, n2, container, parentComponent, anchor)
    }
  }

  function patchElement(n1, n2, container, parentComponent, anchor) {
    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ
    const el = (n2.el = n1.el)
    patchProps(el, oldProps, newProps)
    patchChildren(n1, n2, el, parentComponent, anchor)
  }

  function patchChildren(n1, n2, el, parentComponent, anchor) {
    const n1ShapeFlag = n1.shapeFlag
    const n2ShapeFlag = n2.shapeFlag
    const n1Children = n1.children
    const n2Children = n2.children
    // 新节点是文本
    if (n2ShapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 如果旧节点是数组
      if (n1ShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 1. 把旧节点清空
        unmountChildren(n1.children)
      }
      if (n1Children !== n2Children) {
        // 2. 把新节点文本设置上(这里包含了n1 n2 子节点都是 text 的情况)
        hostSetElementText(el, n2Children)
      }
    } else {
      // 新节点是数组
      if (n1ShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        // 1. 把旧节点文本清空
        hostSetElementText(el, '')
        // 2. 把新节点数组逐个挂载
        mountChildren(n2Children, el, parentComponent, anchor)
      } else {
        // 新旧节点都是数组
        patchKeyedChildren(n1Children, n2Children, el, parentComponent, anchor)
      }
    }
  }

  function patchKeyedChildren(
    n1Children,
    n2Children,
    el,
    parentComponent,
    parentAnchor,
  ) {
    let index = 0
    const n2ChildrenLength = n2Children.length

    let e1 = n1Children.length - 1
    let e2 = n2ChildrenLength - 1
    // 1. 从左侧开始往后：index 必须小于 e1 也必须小于 e2
    // 先找出最左侧第一个不一样的节点
    while (index <= e1 && index <= e2) {
      const n1 = n1Children[index]
      const n2 = n2Children[index]
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, el, parentComponent, parentAnchor)
      } else {
        break
      }
      index++
    }
    // 2. 从前往后比：再找出最右边第一个不一样的节点
    while (index <= e1 && index <= e2) {
      const n1 = n1Children[e1]
      const n2 = n2Children[e2]
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, el, parentComponent, parentAnchor)
      } else {
        break
      }
      e1--
      e2--
    }
    // 3 新节点比旧节点多：往右侧创建
    // 4 新节点比旧节点多：往左侧创建
    if (index > e1) {
      if (index <= e2) {
        // 一个的时候
        // 这边插入的时候需要一个锚点
        const anchor =
          e2 + 1 <= n2Children.length - 1 ? n2Children[e2 + 1].el : null
        while (index <= e2) {
          patch(null, n2Children[index], el, parentComponent, anchor)
          index++
        }
      }
    } else if (index > e2) {
      // 新的节点少
      while (index <= e1) {
        hostRemove(n1Children[index].el)
        index++
      }
    } else {
      // 中间对比
      // 起始位置 index
      const toBePatched = e2 - index + 1
      let patched = 0
      // 初始化一个定长的数组，以最新的剩余节点个数为例
      const newIndexToOldIndexMap = new Array(toBePatched)
      newIndexToOldIndexMap.fill(0)
      // 声明一个变量，用来存储是否真的需要递增子序列算法计算，即是否需要移动
      let moved = false
      // 声明一个变量，用来存储移动的次数
      let maxNewIndexSoFar = 0

      const keyToNewIndexMap = new Map()
      for (let i = index; i <= e2; i++) {
        keyToNewIndexMap.set(n2Children[i].key, i)
      }
      // 遍历旧节点
      for (let startN1 = index; startN1 <= e1; startN1++) {
        const prevChild = n1Children[startN1]
        // 如果新节点已经遍历完，那么旧节点就不用在比较了，剩余的节点直接删除即可
        if (patched >= toBePatched) {
          hostRemove(prevChild.el)
          continue
        }
        // 查看旧节点中元素的key再新节点中是否存在
        let newIndex
        if (prevChild.key) {
          newIndex = keyToNewIndexMap.get(prevChild.key)
        } else {
          // 如果元素的key 不存在，则遍历新节点
          for (let i = startN1; i <= e2; i++) {
            if (isSameVNodeType(prevChild, n2Children[i])) {
              newIndex = i
              break
            }
          }
        }
        if (newIndex === undefined) {
          // 如果不存在
          hostRemove(prevChild.el)
        } else {
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex
          } else {
            // 这里如果最大索引值变量 大于 当前新索引值，说明需要移动
            moved = true
          }
          // 存在
          patch(prevChild, n2Children[newIndex], el, parentComponent, null)
          patched++
          // 遍历老节点时，新节点中也存在, 加 1 避免出现0的情况，因为 0 表示需要创建
          // 得出共同的节点在新节点中的新位置数组排序，然后移动其中变化的即可
          newIndexToOldIndexMap[newIndex - index] = startN1 + 1
        }
      }
      // let j = 0
      // 通过最长递增子序列函数，这里得到不需要移动的节点的索引数组，、
      // 即在这个结果数组中的索引位置的节点不需要移动
      const increasingNewIndexSequence = moved
        ? getSequence(newIndexToOldIndexMap)
        : []
      // for (let index = 0; index < toBePatched; index++) {
      //   if (index !== increasingNewIndexSequence[j]) {
      //     console.log('移动位置', increasingNewIndexSequence[j])
      //   } else {
      //     j++
      //   }
      // }
      // 因为移动节点时必须指定一个锚点且插入前面的
      // 如果是正序循环，后面的节点也是一个需要移动的节点，那么锚点位置就无法确定，
      // 因此需要倒序循环，倒序循环时，刚开始时，锚点位置就是最后一个节点，然后依次向前，锚点逐一确定
      let j = increasingNewIndexSequence.length - 1
      for (let otherIndex = toBePatched - 1; otherIndex >= 0; otherIndex--) {
        const currentIndex = otherIndex + index
        const currentChild = n2Children[currentIndex]
        const anchor =
          currentIndex + 1 < n2Children.length
            ? n2Children[currentIndex + 1].el
            : null
        if (newIndexToOldIndexMap[otherIndex] === 0) {
          patch(null, currentChild, el, parentComponent, anchor)
        } else if (moved) {
          if (j < 0 || otherIndex !== increasingNewIndexSequence[j]) {
            hostInsert(currentChild.el, el, anchor)
          } else {
            console.log('不需要移动')
            j--
          }
        }
      }
    }
    console.log(index, e1, e2)
  }

  function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key
  }

  function unmountChildren(children) {
    children.forEach((child) => {
      hostRemove(child.el)
    })
  }

  function patchProps(el, oldProps, newProps) {
    if (oldProps === newProps) {
      return
    }
    for (const key in newProps) {
      const prevProp = oldProps[key]
      const nextProp = newProps[key]
      if (prevProp !== nextProp) {
        hostPatchProp(el, key, nextProp)
      }
    }
    // 删除没有在新属性中的 key
    if (oldProps !== EMPTY_OBJ) {
      for (const key in oldProps) {
        if (!(key in newProps)) {
          hostPatchProp(el, key, null)
        }
      }
    }
  }

  function mountElement(n1, n2, container, parentComponent, anchor) {
    const { type, children, props, shapeFlag } = n2
    const ele = (n2.el = hostCreateElement(type))
    // 字符串类型，数组类型
    // TEXT_CHILDREN
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      ele.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // ARRAY_CHILDREN
      mountChildren(children, ele, parentComponent, anchor)
    }

    // props
    for (const key in props) {
      const value = props[key]
      hostPatchProp(ele, key, value)
    }
    // insert
    hostInsert(ele, container, anchor)
  }
  function mountChildren(children, container, parentComponent, anchor) {
    children.forEach((child) => {
      patch(null, child, container, parentComponent, anchor)
    })
  }

  function processComponent(n1, n2, container, parentComponent, anchor) {
    console.log('processComponent')
    console.log('n1', n1)
    // 需要处理更新
    if (n1) {
      updateComponent(n1, n2)
    } else {
      mountComponent(n2, container, parentComponent, anchor)
    }
  }

  function updateComponent(n1, n2) {
    const instance = (n2.component = n1.component)
    if (shouldUpdateComponent(n1, n2)) {
      instance.next = n2
      instance.updater()
    } else {
      // no update needed. just copy over properties
      n2.el = n1.el
      instance.vnode = n2
    }
  }

  function mountComponent(initialVNode, container, parentComponent, anchor) {
    const instance = (initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
    ))
    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, container, anchor)
  }

  function setupRenderEffect(instance, initialVNode, container, anchor) {
    instance.updater = effect(
      () => {
        if (!instance.isMounted) {
          const { proxy, render } = instance
          const subTree = render.call(proxy, proxy)
          // vnode -> patch -> element
          patch(null, subTree, container, instance, anchor)
          initialVNode.el = subTree.el
          instance.isMounted = true
          instance.subTree = subTree
        } else {
          // update
          console.log('更新')
          // 需要一个更新完成后的 vnode
          const { next, vnode } = instance
          if (next) {
            next.el = vnode.el
            updateComponentPreRender(instance, next)
          }
          const { proxy, render } = instance
          const subTree = render.call(proxy, proxy)
          const prevSubTree = instance.subTree
          patch(prevSubTree, subTree, container, instance, anchor)
          // 更新后来的 subTree
          instance.subTree = subTree
        }
      },
      {
        scheduler() {
          console.log('update-scheduler')
          queueJobs(instance.updater)
        },
      },
    )
  }

  return {
    createApp: createAppApi(render),
  }
}

function updateComponentPreRender(instance, nextVNode) {
  instance.vnode = nextVNode
  instance.next = null
  instance.props = nextVNode.props
}

// 获得最长递增子序列
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
