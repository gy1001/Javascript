import Compile from "./Compile"

export default class Vue{ 
  constructor(options){
    this.$options = options || {}
    this._data = options.data || undefined
    // 数据变为响应式
    // 模板编译
    new Compile(options.el, this)
  }
}