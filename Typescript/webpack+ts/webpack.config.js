const path = require('path')
const HTMLWEBPAKPLUGIN = require("html-webpack-plugin")

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
  ]
}