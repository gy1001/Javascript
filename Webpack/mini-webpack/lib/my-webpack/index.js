const fs = require("fs")
const path = require("path")
const babelParser = require("@babel/parser")
const babelTraverse = require("@babel/traverse").default
const { transformFromAst } = require("@babel/core")
function myWebpack(config){

  return new Compiler(config)
}

class Compiler{
  constructor(options){
    this.options = options || {}
  }
  // 启动打包
  run(){
    // 1. 读取入口文件
    // 入口文件路径
    const filePath = this.options.entry
    // 获取文件内容
    const file = fs.readFileSync(filePath, "utf-8")
    // 2. 将其解析成 ast 抽象语法树
    const ast = babelParser.parse(file, {
      sourceType: "module" // 解析文件的模块化方案是 module
    })
    // debugger // npm run bug 执行对应脚本时候会进行断点调试
    // console.log(ast)
    // 3. 收集所有的依赖
    // 获取到文件文件夹的路径
    const dirName = path.dirname(filePath)
    // 定义存储依赖的容器
    const deps = {}
    babelTraverse(ast, {
      // 内部会遍历 ast 中 program.body, 判断里面语句类型
      // 如果 type：ImportDeclaration 就会触发当前函数
      ImportDeclaration({node}){
        //debugger
        //console.log(node)
        // 文件相对路径：
        const relativePath = node.source.value
        // 基于入口文件的绝对路径
        const absolutePath = path.resolve(dirName, relativePath)
        // 添加依赖
        deps[relativePath] = absolutePath
      }
    })
    //console.log(deps)
    // 4. 编译代码：将代码中浏览器中不能识别的语法进行编译
    const {code} =  transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    console.log(code)
  }
}


module.exports = myWebpack