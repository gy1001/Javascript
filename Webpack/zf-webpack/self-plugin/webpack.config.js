const path = require('path')
const DonePlugin = require('./plugins/DonePlugin')
const AsyncPlugin = require('./plugins/AsyncPlugin')
const FileListPlugin = require('./plugins/FileListPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineSourcePlugin = require('./plugins/InlineSourcePlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UploadPlugin = require('./plugins/UploadPlugin')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    // ...
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new UploadPlugin({
      bucket: 'xxx',
      domain: 'xxx',
      accessKey: '',
      secretKey: '',
    }),
    new DonePlugin(),
    new AsyncPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new FileListPlugin({
      filename: 'fileList.md',
    }),
    new InlineSourcePlugin({
      match: /\.(js|css)$/,
    }),
  ],
}
