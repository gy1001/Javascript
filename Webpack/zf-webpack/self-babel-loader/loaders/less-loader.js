const less = require('less')

function lessLoader(source) {
  let css = ''
  less.render(source, (err, output) => {
    if (err) {
      console.log(err)
    } else {
      css = output.css
    }
  })
  return css
}
module.exports = lessLoader
