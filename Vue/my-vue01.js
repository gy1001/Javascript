const REGEXP = /\{\{(.+?)\}\}/g
function compiler(template, data){
  let childNodes = template.childNodes // 取出子元素
  for (let index = 0; index < childNodes.length; index++) {
    const element = childNodes[index];
    const TYPE = element.nodeType
    if(TYPE === 3){
      // 文本节点
      let text = element.nodeValue
      text = text.replace(REGEXP, function(_,g) {
        let key = String(arguments[1]).trim()
        return data[key]
      })
      element.nodeValue = text
    }else{
      compiler(element, data)
    }
  }
}