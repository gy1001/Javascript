import { NodeTypes } from './ast'
import { TO_DISPLAY_STRING } from './runtimeHelper'

export const transform = (root: any, options: any = {}) => {
  const context = createTransformContext(root, options)

  // 1. 深度优先搜索
  traverseNode(root, context)

  createRootCodegen(root)
  // 2. 修改 text content
  root.helpers = [...context.helpers.keys()]
}

function createRootCodegen(root: any) {
  // 只支持有一个根节点
  // 并且还是一个 single text node
  const child = root.children[0]
  // 如果是 element 类型的话 ， 那么我们需要把它的 codegenNode 赋值给 root
  // root 其实是个空的什么数据都没有的节点
  // 所以这里需要额外的处理 codegenNode
  // codegenNode 的目的是专门为了 codegen 准备的  为的就是和 ast 的 node 分离开

  if (root.type === NodeTypes.ELEMENT) {
    root.codegenNode = child.codegenNode
  } else {
    root.codegenNode = child
  }
}

function createTransformContext(root: any, options: any) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
    helpers: new Map(),
    helper(key) {
      context.helpers.set(key, 1)
    },
  }
  return context
}

function traverseNode(node: any, context) {
  const emitsFn: any = []
  const nodeTransforms = context.nodeTransforms
  for (let i = 0; i < nodeTransforms.length; i++) {
    const nodeTransform = nodeTransforms[i]
    const onExit = nodeTransform(node, context)
    emitsFn.push(onExit)
  }

  switch (node.type) {
    case NodeTypes.INTERPOLATION:
      context.helper(TO_DISPLAY_STRING)
      break
    case NodeTypes.ELEMENT:
    case NodeTypes.ROOT:
      traverseChildren(node, context)
      break
    default:
      break
  }

  let i = emitsFn.length
  while (i--) {
    emitsFn[i] && emitsFn[i]()
  }
}

function traverseChildren(node: any, context: any) {
  node.children.forEach((node) => {
    traverseNode(node, context)
  })
}
