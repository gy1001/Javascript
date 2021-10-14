const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/env'],
            // plugins: ['@babel/transform-runtime']
            presets: [
              '@babel/preset-flow',
              [
                '@babel/preset-env',
                {
                  // useBuiltIns: 'usage',
                  // targets: {
                  //  ie: '8'
                  // },
                  modules: false
                  // corejs: 3 //新版本需要指定核⼼库版本
                }
              ]
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      title: 'a test'
    })
  ]
}
