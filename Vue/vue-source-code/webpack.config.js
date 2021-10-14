var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var FlowWebpackPlugin = require('flow-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title:'vue-copy',
      favicon:'./public/favicon.ico',
      template: './public/index.html'
    }),
    //new FlowWebpackPlugin({
    //  flowArgs: ['check']
    //})
  ]
}