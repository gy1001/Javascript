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
  }

  parse(code, parent) {
    const deps = []
    // 解析文件内容中的require('xxx')格式的依赖
    let regexp = /require\('(.*)'\)/g
    // require 替换为 __gy__require__
    code = code.replace(regexp, function (match, arg) {
      // 获取依赖路径
      const resultPath = path.join(parent, arg.replace(/'|"/g, ''))
      deps.push(resultPath)
      return `__gy__require__("./${resultPath}")`
    })
    return { code, deps }
  }

  createModule(modulePath, name) {
    const fileCode = fs.readFileSync(modulePath, 'utf-8')
    // 替换后的代码和依赖数组
    const { code, deps } = this.parse(fileCode, path.dirname(name))
    console.log(code, deps)
  }

  start() {
    const entryPath = path.resolve(this.root, this.entry)
    console.log('开始解析文件依赖', entryPath)
    this.createModule(entryPath, this.entry)
  }
}

new GYPack(config).start()
