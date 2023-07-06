const request = require('request')
const path = require('path')
const config = require('./config')
const fs = require('fs')

function downLoad(imgUrl, name) {
  request(imgUrl).pipe(
    fs.createWriteStream(path.join(config.imgDir, name + '.' + 'png'), {
      encoding: 'utf8',
    }),
  )
}

const imgUrls = []
const startNumber = 533454
for (let index = 0; index < 30; index++) {
  imgUrls.push({
    url: config.url + (startNumber + index) + '.jpg',
    name: startNumber + index,
  })
}

imgUrls.forEach((item) => {
  downLoad(item.url, item.name)
})
