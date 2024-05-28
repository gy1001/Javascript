import { NodeTypes } from '../ast'

export function transformExpression(node) {
  // 处理表达式节点
  if (node.type === NodeTypes.INTERPOLATION) {
    node.content = processExpression(node.content)
  }
}

function processExpression(node) {
  node.content = `_ctx.${node.content}`
  return node
}
