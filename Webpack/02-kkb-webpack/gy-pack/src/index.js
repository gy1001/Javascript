#! /usr/bin/env node
const fs = require('fs')
var path = require('path')

const defaultConfig = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  }
}
// 配置合并
// path.resolve() 方法将路径或路径片段的序列解析为绝对路径
const config = { ...defaultConfig, ...require(path.resolve('./kkb.config.js')) }

class GYPack {
  constructor(config) {
    this.config = config
    this.entry = config.entry
    this.root = process.cwd() // 当前根目录
    this.modules = {} // 存储所有代码
  }

  parse(code, parent) {
    const deps = []
    // 解析文件内容中的require('xxx')格式的依赖
    let regexp = /require\('(.*)'\)/g
    // require 替换为 __gy__require__
    // 处理其中的换行符号
    code = code
      .replace(regexp, function (match, arg) {
        // 获取依赖路径
        const resultPath = path.join(parent, arg.replace(/'|"/g, ''))
        deps.push(resultPath)
        return `__gy__require__("./${resultPath}")`
      })
      .replace(/\r\n/g, '\\n')
      .replace(/\n/g, '\\n')

    return { code, deps }
  }

  createModule(modulePath, name) {
    const fileCode = fs.readFileSync(modulePath, 'utf-8')
    // 替换后的代码和依赖数组
    const { code, deps } = this.parse(fileCode, path.dirname(name))
    this.modules[name] = `function(module, exports, __gy__require__){
      eval(\'${code}'\)
    }`
    // 循环获取依赖的数组的内容
    deps.forEach(dep => {
      this.createModule(path.join(this.root, dep), './' + dep)
    })
  }

  generateFile() {
    let template = fs.readFileSync(
      path.resolve(__dirname, './template.js'),
      'utf-8'
    )
    template = template
      .replace('__entry__', this.entry)
      .replace('__module__content__', this.generateModuleStr())

    fs.writeFileSync('./dist/' + this.config.output.filename, template)
  }

  generateModuleStr() {
    let fnTemp = ''
    Object.keys(this.modules).forEach(name => {
      fnTemp += `"${name}":${this.modules[name]},`
    })
    return fnTemp
  }

  start() {
    const entryPath = path.resolve(this.root, this.entry)
    console.log('开始解析文件依赖', entryPath)
    this.createModule(entryPath, this.entry)
    // 生成新文件
    this.generateFile()
  }
}

new GYPack(config).start()
