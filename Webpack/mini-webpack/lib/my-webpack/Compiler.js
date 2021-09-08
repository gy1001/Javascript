const {getAst,getCode,getDeps} = require("./parser")
const fs = require("fs")
const path = require("path")
class Compiler{
  constructor(options){
    // webpack中 的配置
    this.options = options || {}
    // 所有依赖容器
    this.modules = []
  }
  // 启动打包
  run(){
    // 入口文件路径
    const filePath = this.options.entry
    // 第一次构建，得到入口文件的信息
    const fileInfo = this.build(filePath)
    this.modules.push(fileInfo)
    
    //  遍历所有的依赖
    this.modules.forEach((fileInfo) => {
      // deps 类似结构
      /*
        {
          './add.js': '/Users/gaoyuan/learn/Javascript/Webpack/mini-webpack/src/add.js',
          './count.js': '/Users/gaoyuan/learn/Javascript/Webpack/mini-webpack/src/count.js'
        }
      */
      // 取出当前文件的所有依赖
      const hisDeps = fileInfo.deps
      for (const relativePath in hisDeps) {
        // 依赖文件的绝对路径
        const absolutePath = hisDeps[relativePath]
        // 将依赖文件进行处理
        const hisFileInfo =  this.build(absolutePath)
        // 将处理后的文件添加到 modules 中，后面遍历又会进行遍历
        this.modules.push(hisFileInfo)
      }
    })

    // 得到所有的文件依赖
    //console.log(this.modules)
    // 将依赖整理成更好的关系依赖图
    /**
     {
       "index.js": {
         code:'',
         deps: { 'add.js': "xxx"}
       },
       "add.js": {
         code: "",
         deps: { }
       }
     }
     */

    const depsGraph = this.modules.reduce((graph,module) => {
       return {
         ...graph,
         [module.filePath]: {
           code: module.code,
           deps: module.deps
         }
       }
    }, {})
    //console.log(depsGraph)
    this.generate(depsGraph)
  }

  // 开始构建
  build(filePath){
    // 1. 将文件解析为ast
    const ast = getAst(filePath)
    // 2. 获取ast中所有的依赖
    const deps = getDeps(ast,filePath)
    // 3. 将ast解析成code
    const code = getCode(ast)
    // console.log(ast,deps,code)
    return {
      // 文件路径
      filePath,
      // 当前文件的所有依赖
      deps,
      // 当期那文件解析后的代码
      code
    }
  }

  // 生成输出资源
  generate(depsGraph){
    const bundle = `
      (function(objectGraph){
        // require 目的： 加载入口文件
        function require(module){

          // eval(objectGraph[module].code)
          
          // 定义模块内部的 require 函数
          function localRequire(relativePath){
            // 引入当前模块的绝对路径，通过require 加载
            return require(objectGraph[module].deps[relativePath])
          }

          // 定义暴露对象，(将来我们模块要暴露的内容)
          var exports = {};

          (function (require, exports, code){
            eval(code)
          })(localRequire, exports, objectGraph[module].code)

          // 作为 requires 函数的返回值返回出去
          // 使后面的 require 函数能得到暴露的内容
          return exports
        }

        // 加载入口文件
        require('${this.options.entry}');


      })(${JSON.stringify(depsGraph)})
    ` 

    // 生成输出文件的绝对路径
    const filePath = path.resolve(this.options.output.path, this.options.output.filename)
    // 写入文件
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}

module.exports = Compiler