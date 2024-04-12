const loaderUtils = require('loader-utils')
function styleLoader(source) {
  const style = `
  let style = document.createElement('style')
  style.innerHTML = ${JSON.stringify(source)}
  document.head.appendChild(style)
  `
  return style
}

// 在styleLoader
styleLoader.pitch = function (remainLoader) {
  // 返回一个函数，这个函数会接收一个参数，这个参数就是源代码
  let string = `
    const style = document.createElement('style')
    style.innerHTML = require(${loaderUtils.stringifyRequest(
      this,
      '!!' + remainLoader,
    )})
    document.head.appendChild(style)
  `
  return string
}

module.exports = styleLoader
