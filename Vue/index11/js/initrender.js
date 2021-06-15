JGVue.prototype.mount = function(){
  // 需要提供一个 render 方法: 生成虚拟 dom 
  this.render = this.createRenderFn()
  this.mountComponent()
}

JGVue.prototype.mountComponent = function(){
    // 执行mountComponent()函数
  let mount = () =>   {
    this.update(this.render())
  }
  mount.call(this) // 本质上应该交给watcher 这里还没讲到这里
}

JGVue.prototype.createRenderFn = function(){
  let AST = getNode(this._template)
  // Vue中的做法： 将AST + data => VNode
  // 这里的做法：将带坑位的 VNode + data => 含有数据的 VNode
  return function render(){
    // 将带坑的VNode 转换为 带数据的 VNode
    let _tmp = combine(AST, this._data)
    return _tmp
  }
}

// 将虚拟dom 渲染到页面中：注意 diff 算法在其中
JGVue.prototype.update = function(virtualDom){
    // 简化，直接生成 HTML DOM replaceChild 到页面中
    // 父元素.replaceChild(新元素，旧元素)
  let realDom = parseVNode(virtualDom)
    //debugger
    // 这个算法是不负责任的
    // 每次都会将页面中的 DOM 中全部替换
  this._parent.replaceChild(realDom, document.querySelector("#root"))
}