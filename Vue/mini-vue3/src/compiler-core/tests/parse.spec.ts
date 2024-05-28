import { NodeTypes } from '../src/ast'
import { baseParse } from '../src/parse'

describe('Parse', () => {
  describe('interpolation', () => {
    test('simple interpolation', () => {
      // TODO
      const ast = baseParse('{{ message }}')
      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: 'message',
        },
      })
    })
  })

  describe('element', () => {
    it('simple element', () => {
      const ast = baseParse('<div></div>')
      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: 'div',
        children: [],
      })
    })
  })

  describe('text', () => {
    it('simple text', () => {
      const ast = baseParse(' hello world')
      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.TEXT,
        content: ' hello world',
      })
    })
  })

  // 最终是需要解析 <div> hi, {{message}} </div>
  describe('nested', () => {
    it('nested', () => {
      const ast = baseParse('<div>hi,{{message}}</div>')
      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: 'div',
        children: [
          {
            type: NodeTypes.TEXT,
            content: 'hi,',
          },
          {
            type: NodeTypes.INTERPOLATION,
            content: {
              type: NodeTypes.SIMPLE_EXPRESSION,
              content: 'message',
            },
          },
        ],
      })
    })
  })

  describe('nestedTwo', () => {
    it('nested', () => {
      const ast = baseParse('<div><p>hi,</p>{{message}}</div>')
      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: 'div',
        children: [
          {
            type: NodeTypes.ELEMENT,
            tag: 'p',
            children: [
              {
                type: NodeTypes.TEXT,
                content: 'hi,',
              },
            ],
          },
          {
            type: NodeTypes.INTERPOLATION,
            content: {
              type: NodeTypes.SIMPLE_EXPRESSION,
              content: 'message',
            },
          },
        ],
      })
    })
  })

  test('show throw error when lack end tag', () => {
    expect(() => {
      baseParse('<div>hi,{{message}}<span></div>')
    }).toThrow('tag 不匹配：' + 'span')
  })
})
