const path = require('path')
const P1 = require('./plugins/P1')
const P2 = require('./plugins/P2')
module.exports = {
  entry: './src/index.js', // 入口文件路径
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出文件路径
  },
  module: {
    rules: [
      {
        test: /\.less$/, // 匹配所有以.css结尾的文件
        use: [
          path.resolve(__dirname, 'loader', 'style-loader.js'), // 样式加载器
          path.resolve(__dirname, 'loader', 'less-loader.js'), // 样式加载器
        ],
      },
    ],
  },
  plugins: [new P1(), new P2()],
}
