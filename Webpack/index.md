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

# webpack 执行流程

1. 初始化 Complier：webpack(config) 得到 Compiler 对象
2. 开始编译，调用Compiler 对象 run 方法开始执行编译
3. 确定入口；根据配置中的 entry 找出所有的入口文件
4. 编译模板：从入口文件出发，调用所有配置的Loader 对模块进行编译，在找出该模块依赖的模块，递归直到所有模块被加载出来
5. 完成编译模块：在经过第4步使用 Loader 编译完所有模块以后，得到了每个模块被编译后的最终内容以及他们之间的依赖关系
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的chunk，再把每个Chunk 转换成一个单独的文件加入到输出列表（注意：这步是可以修改输出内容的最后机会）
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统中