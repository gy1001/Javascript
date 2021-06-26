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
    childNodes.forEach(node => {
      if(node.nodeType === 3){
        this.compileText(node)
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
      console.log(attrName, attrValue, directive)
      if(attrName.indexOf('v-') == 0){
        // 获得指令
        var dir = attrName.substring(2)
        if(dir === "model"){

        }else if(dir === "if"){

        }
      }
    })
  }

  compileText(node){
    console.log("text", node.textContent.trim())
  }
}