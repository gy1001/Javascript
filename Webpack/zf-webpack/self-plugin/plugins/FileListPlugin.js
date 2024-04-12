class FileListPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('OnePlugin', (compilation) => {
      compilation.hooks.additionalAssets.tapAsync('MyPlugin', (callback) => {
        let content = `## 文件名  资源大小`
        Object.entries(compilation.assets).forEach(([filename, stat]) => {
          content += `\n- ${filename}   ${stat.size()}`
        })
        compilation.assets[this.options.filename] = {
          source: function () {
            return content
          },
          size: function () {
            return content.length
          },
        }
        // 继续执行后续操作
        callback()
      })
    })
  }
}

module.exports = FileListPlugin
