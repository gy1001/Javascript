const less = require('less')

function lessLoader(source) {
  let css = ''
  less.render(source, (err, output) => {
    if (err) {
      console.log(err)
    } else {
      // 需要把 \n 替换成 \\n 否则 会报错
      css = output.css.replace(/\n/g, '\\n')
    }
  })
  return css
}
module.exports = lessLoader
