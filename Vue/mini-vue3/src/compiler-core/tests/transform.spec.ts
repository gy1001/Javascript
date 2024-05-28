import { NodeTypes } from '../src/ast'
import { baseParse } from '../src/parse'
import { transform } from '../src/transform'

describe('transform', () => {
  it('happy path', () => {
    const ast = baseParse('<div>hi, {{message}}</div>')
    const pluginText = (node: any) => {
      if (node.type === NodeTypes.TEXT) {
        node.content = node.content + 'mini-vue'
      }
    }
    transform(ast, {
      nodeTransforms: [pluginText],
    })
    const nodeText = ast.children[0].children[0]
    expect(nodeText.content).toBe('hi, mini-vue')
  })
})
