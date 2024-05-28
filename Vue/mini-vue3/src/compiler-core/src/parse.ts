import { NodeTypes } from './ast'

export function baseParse(content: string) {
  const context = createParserContext(content)
  return createRoot(parserChildren(context, []))
}

function createRoot(children) {
  return {
    children,
    type: NodeTypes.ROOT,
  }
}

function parseTag(context: any, type: TagType) {
  const regex = /^<\/?([a-z]*)>/i
  const match: any = regex.exec(context.source)
  const tag = match[1]
  advanceBy(context, match[0].length)
  if (type === TagType.End) {
    return
  }
  return {
    type: NodeTypes.ELEMENT,
    tag: tag,
  }
}
enum TagType {
  Start,
  End,
}

function parseElement(context, ancestors) {
  // 解析tag
  // 删除处理完成的代码
  const element: any = parseTag(context, TagType.Start)
  ancestors.push(element.tag)
  element.children = parserChildren(context, ancestors)
  ancestors.pop()
  // 这里要做判断，如果 source 中的闭合标签和当前的 tag 一致，则说明是闭合标签
  // console.log(element.tag, context, 11111)
  if (element.tag === context.source.slice(2, 2 + element.tag.length)) {
    parseTag(context, TagType.End)
  } else {
    throw new Error('tag 不匹配：' + element.tag)
  }
  return element
}

function parseInterpolation(context) {
  const openDelimiter = '{{'
  const closeDelimiter = '}}'

  const closeIndex = context.source.indexOf(
    closeDelimiter,
    openDelimiter.length,
  )

  advanceBy(context, openDelimiter.length)
  // context.source = context.source.slice(openDelimiter.length) // 删除 {{

  const rawContentLength = closeIndex - openDelimiter.length
  const rawContent = parseTextData(context, rawContentLength)
  const content = rawContent.trim()

  advanceBy(context, rawContentLength + closeDelimiter.length)
  // context.source = context.source.slice(
  //   rawContentLength + closeDelimiter.length,
  // ) // }}
  return {
    type: NodeTypes.INTERPOLATION, // 'interpolation',
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content,
    },
  }
}

function advanceBy(context: any, length: number) {
  context.source = context.source.slice(length)
}

function parserChildren(context, ancestors) {
  const nodes: any = []
  let node
  while (!isEnd(context, ancestors)) {
    const contextSource = context.source
    if (contextSource.startsWith('{{')) {
      node = parseInterpolation(context)
    } else if (contextSource[0] === '<') {
      if (/[a-z]/i.test(contextSource[1])) {
        node = parseElement(context, ancestors)
      }
    }
    // 如果 node 没有值，我们就当做解析文本操作
    if (!node) {
      node = parseText(context)
    }
    nodes.push(node)
  }
  return nodes
}

function parseText(context) {
  let endToken = ['{{', '<']
  let endIndex = context.source.length
  // 需要找出尽量靠前的那个结束位置的索引
  endToken.forEach((token) => {
    const index = context.source.indexOf(token)
    if (index !== -1 && endIndex > index) {
      endIndex = index
    }
  })
  // 获取当期的内容
  // 推进
  const content = parseTextData(context, endIndex)
  advanceBy(context, content.length)
  return {
    type: NodeTypes.TEXT,
    content: content,
  }
}

function isEnd(context, ancestors) {
  // 2. 遇到结束标签的时候
  const contextS = context.source
  // </div
  if (contextS.startsWith('</')) {
    for (let index = 0; index < ancestors.length; index++) {
      const tag = ancestors[index]
      if (contextS.slice(2, 2 + tag.length) === tag) {
        return true
      }
    }
  }
  // 1. source 有值的时候
  return !contextS
}

function parseTextData(context: any, length) {
  return context.source.slice(0, length)
}

function createParserContext(content: string) {
  return {
    source: content,
  }
}
