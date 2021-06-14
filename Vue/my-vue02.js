function MVue(options){
  // 习惯： 内部数据使用下划线 _ 开头, 只读数据使用 $ 开头
  this._data = options.data
  this._el = options.el
  this.$options = options
  // 准备工作（获得准备模板）
  this.$el = this._templateDOM = document.querySelector(options.el)
  this._parent = this.$el.parentNode;
  // 渲染工作
  this.render()
}

// 将模板  和数据 得到 html 加到页面中
MVue.prototype.render = function(){
  this.compiler()
}

/**  编译，将数据与模板结合，得到真正的 dom 元素 **/
MVue.prototype.compiler = function(tmpNode){
  let realHTMLDOM= this._templateDOM.cloneNode(true)
  compiler(realHTMLDOM, this._data)
  this.update(realHTMLDOM)
}

// 将dom 中的元素加到 html 中
MVue.prototype.update = function(realDOM){
  this.$el.parentNode.replaceChild(realDOM, document.querySelector('#root'))
}


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
        return getValueByPath(data,key)
      })
      element.nodeValue = text
    }else{
      compiler(element, data)
    }
  }
}

function getValueByPath(obj, key){
  const keys = key.split('.')
  return keys.reduce((currentValue, nextKey) => {
    return currentValue[nextKey]
  }, obj)
}