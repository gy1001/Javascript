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
            loader: 'banner-loader',
            options: {
              text: '这是一个自定义的banner',
            },
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.jpeg$/, // 匹配所有的js文件
        exclude: /node_modules/, // 排除node_modules文件夹
        use: [
          // {
          //   // 目的就是根据图片生成一个 md5 发射到 dist 目录下， file-loader 还会返回当前的图片路径
          //   loader: 'file-loader',
          // },
          {
            loader: 'url-loader',
            options: {
              limit: 20 * 1024,
            },
          },
        ],
      },
    ],
  },
}
