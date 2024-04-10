const schemeUtils = require('schema-utils')

function bannerLoader(source) {
  const cb = this.async()
  schemeUtils.validate(
    {
      type: 'object',
      properties: {
        // 配置参数
        text: {
          type: 'string',
        },
      },
    },
    this.query,
    // 错误模块
    'babel-loader',
  )
  cb(null, `/**${this.query.text}**/ ${source}`)
}

module.exports = bannerLoader
