const path = require('path')
const HTMLWEBPAKPLUGIN = require("html-webpack-plugin")
// clean-webpack-plugin 插件可以每次编译前先删除dist目录

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/ ,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HTMLWEBPAKPLUGIN({
      template: './src/index.html'
    })
  ],
  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"]
  }
}