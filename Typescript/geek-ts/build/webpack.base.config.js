const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: [".js",".ts",".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true //  只做语言转换，不做类型检查 ,
              //编辑器会进行类型提示， 也可以安装一个插件来做类型检查  npm i fork-ts-checker-webpack-plugin -D
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html'
    })
  ]
} 