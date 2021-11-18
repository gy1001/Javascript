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

  parse() {
    // 解析文件内容中的require('xxx')格式的依赖
  }

  createModule(modulePath, name) {
    const code = fs.readFileSync(modulePath, 'utf-8')
    console.log(code, name)
  }

  start() {
    const entryPath = path.resolve(this.root, this.entry)
    console.log('开始解析文件依赖', entryPath)
    this.createModule(entryPath, this.entry)
  }
}

new GYPack(config).start()
