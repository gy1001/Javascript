const fs = require('fs')
const util = require('util')
const mineReadFile = util.promisify(fs.readFile)

// fs.readFile('./content.txt', (err, data1) => {
//   if (err) {
//     throw err
//   }
//   fs.readFile('./content.txt', (err, data2) => {
//     if (err) throw err
//     fs.readFile('./content.txt', (err, data3) => {
//       if (err) throw err
//       console.log(data1, data2, data3)
//     })
//   })
// })

async function main() {
  try {
    let data1 = await mineReadFile('./content.txt')
    let data2 = await mineReadFile('./content.txt')
    let data3 = await mineReadFile('./content.txt')
    console.log(data1, data2, data3)
  } catch (error) {
    console.log('error', error)
  }
}
main()
