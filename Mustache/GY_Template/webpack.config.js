const path = require("path")

module.exports = {
  mode: 'development',
  // 入口文件
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
  },
  // 配置 webpack-dev-server
  devServer: {
    // 静态文件目录
    contentBase: path.join(__dirname, "www"),
    // 不压缩
    compress: false,
    // 端口号
    port: 9000,
    // 虚拟机打包的路径，bundle.js文件没有真正的生成
    publicPath: "/xuni"
  }
}