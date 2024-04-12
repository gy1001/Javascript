const loaderIUtils = require('loader-utils')
// fileLoader 需要返回一个路径
function fileLoader(source) {
  // 处理文件逻辑
  const fileName = loaderIUtils.interpolateName(this, '[hash].[ext]', {
    content: source,
  })
  // 发射文件
  this.emitFile(fileName, source)
  // 返回处理后的内容
  return `module.exports = ${JSON.stringify(fileName)}`
}
// 加上这一行后，拿到的 source 就会改为 buffer 模式，二进制
fileLoader.raw = true
module.exports = fileLoader
