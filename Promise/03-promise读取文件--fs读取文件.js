// 回调函数形式
const fs = require('fs')

fs.readFile('./content.txt', (err, data) => {
  if (err) throw err
  console.log(data)
})

// Promise 形式
let p = new Promise((resolve, reject) => {
  fs.readFile('./content.txt', (err, data) => {
    if (err) {
      reject(err)
      return
    }
    resolve(data)
  })
})

p.then(
  (result) => {
    console.log(result)
  },
  (err) => {
    console.log('err', err)
  }
)
