const {merge} = require("webpack-merge")
const optimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const baseWebpackConfig = require("./webpack.base.config.js")
console.log(process.env.PROD_NAME)
const prodMergeConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new optimizeCssAssetsPlugin()
    ]
  }
})
module.exports = prodMergeConfig