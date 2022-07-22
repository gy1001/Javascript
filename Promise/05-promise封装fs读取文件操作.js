/**
 * 封装一个函数 mineReadFile 读取文件内容
 * 参数：path 文件路径
 * 返回：promise 对象
 */
function mineReadFile(path) {
  return new Promise((resolve, reject) => {
    // 读取文件
    require('fs').readFileSync(path, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  })
}

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
