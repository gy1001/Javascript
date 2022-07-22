/**
 * util.promisify 方法
 */
const util = require('util')

const fs = require('fs')

const mineReadFile = util.promisify(fs.readFile)

mineReadFile('./content.txt').then(
  (result) => {
    console.log('读取文件成功')
    console.log(result)
  },
  (err) => {
    console.log('读取文件失败')
    console.log(err)
  }
)
