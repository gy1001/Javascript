import { NodeTypes } from '../ast'
import { CREATE_ELEMENT_VNODE } from '../runtimeHelper'

export function transformElement(node: any, context: any) {
  if (node.type === NodeTypes.ELEMENT) {
    return () => {
      context.helper(CREATE_ELEMENT_VNODE)

      const { children, props, tag } = node
      let vNodeChildren = children[0]
      const vNodeTag = `'${tag}'`
      const vNodeProps = props

      const vNodeElement = {
        type: NodeTypes.ELEMENT,
        tag: vNodeTag,
        children: vNodeChildren,
        props: vNodeProps,
      }
      node.codegenNode = vNodeElement
    }
  }
}
