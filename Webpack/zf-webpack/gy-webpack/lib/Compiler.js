const fs = require('fs')
const path = require('path')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const babelTypes = require('@babel/types')
const ejsLoader = require('ejs')

class Compiler {
  constructor(config) {
    // 运行项目根目录
    this.rootPath = process.cwd()
    // 配置
    this.config = config
    // 入口文件路径
    this.entryPath = ''
    // 入口配置
    this.entry = config.entry
    // 输出
    this.output = config.output
    // 总体模块对象
    this.modules = {}
    // 要写入的静态资源 文件名 以及内容
    this.assets = {}
  }

  getSourceCode(modulePath) {
    let content = fs.readFileSync(modulePath, 'utf-8')
    return content
  }

  buildModule(modulePath, isEntry) {
    const originSourceCode = this.getSourceCode(modulePath)
    // 优化文件名称
    const moduleName = './' + path.relative(this.rootPath, modulePath)
    // 解析文件内容
    const { sourceCode, dependencies } = this.parse(
      originSourceCode,
      path.dirname(moduleName),
    )
    // 保存模块
    this.modules[moduleName] = sourceCode
    // 如果是入口文件，记录文件路径
    if (isEntry) {
      this.entryPath = moduleName
    }
    // 递归构建依赖模块
    dependencies.forEach((dep) => {
      // 此时非入口文件，所以是 false
      this.buildModule(path.resolve(this.rootPath, dep), false)
    })
  }

  parse(sourceCode, parentPath) {
    const ast = babelParser.parse(sourceCode)
    const dependencies = []
    traverse(ast, {
      CallExpression(nodePath) {
        const node = nodePath.node
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__'
          let moduleName = node.arguments[0].value
          moduleName = path.extname(moduleName)
            ? moduleName
            : moduleName + '.js'
          moduleName = './' + path.join(parentPath, moduleName)
          dependencies.push(moduleName)
          node.arguments = [babelTypes.stringLiteral(moduleName)]
        }
      },
    })
    return {
      sourceCode: generator(ast).code,
      dependencies,
    }
  }

  emitFile() {
    const templateStr = this.getSourceCode(
      path.resolve(__dirname, 'template.ejs'),
    )
    const outPutCodeStr = ejsLoader.render(templateStr, {
      entryId: this.entryPath,
      modules: this.modules,
    })
    // 输出目录以及文件名
    const outFileName = path.resolve(this.output.path, this.output.filename)
    this.assets[outFileName] = outPutCodeStr
    for (let file in this.assets) {
      fs.writeFileSync(file, outPutCodeStr)
    }
  }

  run() {
    // 从入口文件出发，开始构建模块
    this.buildModule(path.resolve(this.rootPath, this.entry), true)
    // 输出文件
    this.emitFile()
  }
}

module.exports = Compiler
