<!--
 * @Author: gaoyuan
 * @Date: 2020-11-04 17:57:18
 * @LastEditors: gaoyuan
 * @LastEditTime: 2020-11-04 18:00:20
-->
1. vue中使用 webpack 遇到第三方库或者包内有es6语法的需要特殊处理
  例如 node_modules/@hc/core 下引用时候文件有es6语法，部分安卓手机在webview会显示报错（其实是报错了）
  需要在 **vue.config.js** 中的 **chainWebpack** 属性下中添加如下配置
  ```javascript
    config.module
      .rule('babel-js')
      .test(/\.js$/)
      .include
      .add(resolve('node_modules/@hc/core')) // 处理core目录
      .end()
      .use('babel')
      .loader('babel-loader')
  ```
