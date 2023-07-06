const cheerio = require('cheerio')

function findImg(dom, callback) {
  console.log(dom)
  let $ = cheerio.load(dom)
  $('img').each(function (i, elem) {
    let imgSrc = $(this).attr('src')
    if (imgSrc) {
      callback(imgSrc, i)
    }
    //目标页面有懒加载程序，图片地址先写在data-original当中
    //没有这种情况的可以去掉
    let imgOriginalSrc = $(this).attr('data-original')
    if (imgOriginalSrc) {
      callback(imgOriginalSrc, i)
    }
  })
}

module.exports.findImg = findImg
