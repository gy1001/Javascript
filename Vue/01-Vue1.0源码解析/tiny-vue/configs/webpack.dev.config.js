const baseWebpackConfig = require("./webpack.base.config.js")
const {merge} = require("webpack-merge")
const {HotModuleReplacementPlugin} = require("webpack")
const path = require('path')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    host: 'localhost',
    port: 8080,
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin() // 热更新模块 
  ],
})
module.exports = devWebpackConfig