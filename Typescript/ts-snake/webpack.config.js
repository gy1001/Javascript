const path = require('path')
const HTMLWEBPAKPLUGIN = require("html-webpack-plugin")
// clean-webpack-plugin 插件可以每次编译前先删除dist目录

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    // 告诉webpack 不能使用箭头函数: https://webpack.js.org/configuration/output/#outputenvironment
    environment: {
      arrowFunction: false
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/ ,
        use: [
          {
            // 配置babel
            loader: "babel-loader",
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                // 指定环境的插件
                [
                  "@babel/preset-env",
                  // 配置信息
                  {
                    targets: {
                      "chrome": "88",
                    },
                    // 指定corejs的版本
                    "corejs": "3",
                    // 使用corejs的方式：usage, 表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new HTMLWEBPAKPLUGIN({
      template: './src/index.html'
    })
  ],
  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"]
  }
}