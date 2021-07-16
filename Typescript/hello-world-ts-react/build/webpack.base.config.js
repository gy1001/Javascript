const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
module.exports = {
  entry: {
    // react 的库文件比较大，所以把库文件和业务文件分开，库文件进行缓存
    app: './src/index.tsx'
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
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
              //transpileOnly: true //  只做语言转换，不做类型检查 ,
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
  ],
  // webpack拆包
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
} 