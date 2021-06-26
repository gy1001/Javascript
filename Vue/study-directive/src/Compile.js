import Watcher from "./Watcher"

export default class Compile{
  constructor(el, vm){
    this.$vue = vm
    this.$el = document.querySelector(el)
    // 如果用户传入了挂载点
    if(this.$el){
      // 调用函数，让节点变为 fragment, 类似于 mustache 中的 tokens,
      // 实际上用的是 AST, 这里就是轻量级的， fragment
      let $fragment =  this.node2Fragment(this.$el)
      this.compile($fragment)
      // 
      this.$el.appendChild($fragment)
    }
  }

  node2Fragment(el){
    var fragment = document.createDocumentFragment()
    var firstChild;
    while(firstChild = el.firstChild){
      fragment.appendChild(firstChild)
    }
    return fragment
  }

  compile(fragment){
    const childNodes = fragment.childNodes
    var reg = /\{\{(.*)\}\}/
    childNodes.forEach(node => {
      if(node.nodeType === 3 && reg.test(node.textContent.trim())){
        // 文本节点
      //   我是文本节点{{name}}我是后面的文本{{message}} 这里暂时不支持这种多个串联的情况
        this.compileText(node, reg)
      }else if(node.nodeType === 1){
        this.compileElement(node)
      } 
    })
  }

  compileElement(node){
    var nodeAttrs = node.attributes || []
    Array.prototype.slice.call(nodeAttrs).forEach(attr => {
      // 这里就分析指令
      var attrName = attr.name
      var attrValue = attr.value
      if(attrName.indexOf('v-') == 0){
        // 获得指令
        var dir = attrName.substring(2)
        if(dir === "model"){
          new Watcher(this.$vue, attrValue, (newValue) => {
            node.value = newValue
          })
          var v = this.getValueByPath(this.$vue, attrValue)
          node.value = v;
          node.addEventListener('input', e => {
            var newValue = e.target.value
            node.value = newValue
            this.setValue(this.$vue, attrValue, newValue)
            //this.$vue[attrValue] = newValue
          })
        }else if(dir === "if"){

        }
      }
    })
  }

  compileText(node, reg){
    const matchName = node.textContent.match(reg)[1]
    var result = node.textContent.replace(reg, () => {
      return this.getValueByPath(this.$vue, matchName)
    })
    node.textContent = result
    new Watcher(this.$vue, matchName, (newValue) => {
      node.textContent = newValue
    })
  }

  getValueByPath(vm, exp){
    var value = vm
    const exps = exp.split('.')
    exps.forEach(exp => {
      value = value[exp]
    })
    return value
  }

  setValue(vm, exp ,value){
    var val = vm
    const exps = exp.split('.')
    exps.forEach((exp,index) => {
      if(index < exps.length - 1){
        val = val[exp]
      }else{
        val[exp] = value
      }
    })
  }
}