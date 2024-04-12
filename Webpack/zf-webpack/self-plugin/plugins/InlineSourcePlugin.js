// 将外联的标签变为内联的，比如 link css 变为style 等
const HtmlWebpackPlugin = require('html-webpack-plugin')
class InlineSourcePlugin {
  constructor(options) {
    this.options = options
  }
  // 处理某一个标签
  processTag(tag, compilation) {
    let newTag = {}
    let url = ''
    if (
      tag.tagName === 'link' &&
      this.options.match.test(tag.attributes.href)
    ) {
      newTag = {
        tagName: 'style',
        attributes: { rel: 'stylesheet', type: 'text/css' },
      }
      url = tag.attributes.href
    }
    if (
      tag.tagName === 'script' &&
      this.options.match.test(tag.attributes.src)
    ) {
      newTag = {
        tagName: 'script',
        attributes: { defer: true, type: 'application/javascript' },
      }
      url = tag.attributes.src
    }
    if (url) {
      newTag.innerHTML = compilation.assets[url].source()
      // 删除原标签对应资源
      delete compilation.assets[url]
      return newTag
    }
    return tag
  }

  // 处理引入标签的数据
  processTags(data, compilation) {
    let headTags = []
    let bodyTags = []
    data.headTags.forEach((tag) => {
      headTags.push(this.processTag(tag, compilation))
    })
    data.bodyTags.forEach((tag) => {
      bodyTags.push(this.processTag(tag, compilation))
    })

    return {
      ...data,
      headTags: headTags,
      bodyTags: bodyTags,
    }
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'alterPlugin',
        (data, cb) => {
          data = this.processTags(data, compilation)
          cb(null, data)
        },
      )
    })
  }
}
module.exports = InlineSourcePlugin
