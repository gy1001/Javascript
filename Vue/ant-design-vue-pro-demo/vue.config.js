const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
const path = require('path')
const options = {
  antDir: path.join(__dirname, './node_modules/ant-design-vue'),
  stylesDir: path.join(__dirname, './src'),
  varFile: path.join(
    __dirname,
    './node_modules/ant-design-vue/lib/style/themes/default.less'
  ),
  lessUrl: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js',
  publicPath: '',
  themeVariables: ['@primary-color'],
  generateOnce: false,
}

const themePlugin = new AntDesignThemePlugin(options)

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          //'primary-color': 'yellow',
          //'link-color': '#1DA57A',
          //'border-radius-base': '2px',
        },
      },
    },
    extract: false,
  },
  configureWebpack: {
    plugins: [themePlugin],
  },
}
