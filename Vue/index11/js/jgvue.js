function JGVue(options){
  this._data = options.data
  let elm = document.querySelector(options.el) // vue中是字符串，这里是DOM
  this._template = elm
  this._parent = elm.parentNode
  this.initData() // 将data 进行响应式转换，进行代理
  this.mount() // 挂载
}