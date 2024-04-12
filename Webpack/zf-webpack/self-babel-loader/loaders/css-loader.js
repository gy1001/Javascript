function CssLoader(source) {
  let reg = /url\((.+?)\)/g
  let pos = 0
  let resultArr = []
  resultArr.push('let list = []')
  while ((match = reg.exec(source))) {
    const [matchStr, groups] = match
    // console.log(source.slice(pos, match.index))
    resultArr.push(
      `list.push(${JSON.stringify(source.slice(pos, match.index))})`,
    )
    pos = reg.lastIndex
    // 这里把url 中匹配到的替换成 require 的写法
    resultArr.push(`list.push('url(')`)
    resultArr.push(`list.push(require(${groups}))`)
    resultArr.push(`list.push(')')`)
  }
  resultArr.push(`list.push(${JSON.stringify(source.slice(pos))})`)
  resultArr.push(`module.exports=list.join("")`)
  return resultArr.join('\r\n')
}

module.exports = CssLoader
