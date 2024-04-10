const babelCore = require('@babel/core')

function babelLoader(source) {
  // webpack 5 已经可以通过this.query 直接获取loader的options配置，所以不需要利用loader-utils工具获取：
  // 异步 loader 必须要调用this.async()以及this.callback来告知
  let cb = this.async()
  // console.log(this.resourcePath) 是一个绝对路径
  // /Users/gaoyuan/Code/learn/MyGithub/Javascript/Webpack/zf-webpack/self-babel-loader/src/index.js
  babelCore.transform(
    source,
    {
      ...this.query,
      sourceMaps: true,
      // 增加 filename 属性，用于生成 source-map 文件名,否则在浏览器中查看 source-map 文件名是空的
      filename: this.resourcePath.split('/').pop(),
    },
    function (err, result) {
      // 异步
      cb(err, result.code, result.map)
    },
  )
}

module.exports = babelLoader
