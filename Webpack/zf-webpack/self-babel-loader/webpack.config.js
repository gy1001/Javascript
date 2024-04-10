const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配所有的js文件
        exclude: /node_modules/, // 排除node_modules文件夹
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
}
