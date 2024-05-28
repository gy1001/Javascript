import { isString } from '../../shared'
import { NodeTypes } from './ast'
import {
  CREATE_ELEMENT_VNODE,
  TO_DISPLAY_STRING,
  helperMapName,
} from './runtimeHelper'

export function generator(ast: any) {
  const context = createCodegenContext()
  const { push } = context
  genFunctionPreamble(ast, context)

  const functionName = 'render'
  const args = ['_ctx', '_cache', '$props', '$setup', '$data', '$options']

  push(`function ${functionName}(${args.join(',')}){`)
  push(`return `)
  genNode(ast.codegenNode, context)
  push('}')
  return {
    code: context.code,
  }
}

function genFunctionPreamble(ast, context) {
  const { push, helper } = context
  const VueBinging = 'Vue'
  // const helpers = ['toDisplayString']
  const aliasHelper = (s) => `${helperMapName[s]}: ${helper(s)}`
  if (ast.helpers.length > 0) {
    push(`const {${ast.helpers.map(aliasHelper).join(', ')}} = ${VueBinging}`)
  }
  push('\n')
  // push(`const { toDisplayString: _toDisplayString } = Vue`)
  // push('\n')
  push('return ')
}

function genNode(node: any, context) {
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context)
      break
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context)
      break
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context)
      break
    case NodeTypes.ELEMENT:
      genElement(node, context)
      break
    case NodeTypes.COMPOUND_EXPRESSION:
      genCompoundExpression(node, context)
      break
    default:
      break
  }
}

function genCompoundExpression(node, context) {
  const { children } = node
  const { push } = context
  children.forEach((child) => {
    if (isString(child)) {
      push(child)
    } else {
      genNode(child, context)
    }
  })
}

function genElement(node, context) {
  const { push, helper } = context
  const { tag, children, props } = node
  push(`${helper(CREATE_ELEMENT_VNODE)}(`)
  genNodeList(genNullable([`'${tag}'`, props, children[0]]), context)
  push(')')
}

function genNodeList(nodes, context) {
  const { push } = context
  nodes.forEach((node, index) => {
    if (isString(node)) {
      push(node)
    } else {
      genNode(node, context)
    }
    if (index < nodes.length - 1) {
      push(', ')
    }
  })
}

function genNullable(args) {
  return args.map((arg) => arg || 'null')
}

function genExpression(node: any, context) {
  const { push } = context
  push(`${node.content}`)
}

function genText(node, context) {
  const { push } = context
  push(`'${node.content}'`)
}

function genInterpolation(node, context) {
  const { push, helper } = context
  push(`${helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  push(')')
}

function createCodegenContext() {
  const context = {
    code: '',
    push(source) {
      context.code += source
    },
    helper(key) {
      return `_${helperMapName[key]}`
    },
  }
  return context
}
