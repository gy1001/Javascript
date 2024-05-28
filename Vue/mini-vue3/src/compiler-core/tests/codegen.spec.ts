import { generator } from '../src/codegen'
import { baseParse } from '../src/parse'
import { transform } from '../src/transform'
import { transformElement } from '../src/transform/transformElement'
import { transformExpression } from '../src/transform/transformExpression'
import { transformText } from '../src/transform/transformText'

describe('codegen', () => {
  it('string', () => {
    const ast = baseParse('hi')
    transform(ast)
    const { code } = generator(ast)
    // 快照测试：可以用来抓bug 以及 更新
    expect(code).toMatchSnapshot()
  })

  it('interpolation', () => {
    const ast = baseParse('{{message}}')
    transform(ast, {
      nodeTransforms: [transformExpression],
    })
    const { code } = generator(ast)
    expect(code).toMatchSnapshot()
  })

  it('element', () => {
    const ast = baseParse('<div></div>')
    transform(ast, {
      nodeTransforms: [transformElement],
    })
    const { code } = generator(ast)
    expect(code).toMatchSnapshot()
  })

  it('element + text + interpolation', () => {
    const ast: any = baseParse('<div>hi,{{message}}</div>')
    transform(ast, {
      nodeTransforms: [transformExpression, transformElement, transformText],
    })
    const { code } = generator(ast)
    expect(code).toMatchSnapshot()
  })
})
