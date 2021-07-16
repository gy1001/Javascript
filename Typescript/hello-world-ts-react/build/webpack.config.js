const {merge} = require("webpack-merge")
const baseConfig = require("./webpack.base.config")
const devConfig = require("./webpack.dev.config")
const proConfig = require("./webpack.pro.config")

// node 环境下不是这样的写法
let config = process.env.NODE_ENV === "development" ? devConfig : proConfig
module.exports = merge(baseConfig, config)

//module.exports = (env, argv) => {
//  let config = argv.mode === "development" ? devConfig : proConfig
//  return merge(baseConfig, config)
//}