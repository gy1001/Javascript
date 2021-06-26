import Compile from "./Compile"
import { observe } from './observe'
import Watcher from "./Watcher"
export default class Vue{ 
  constructor(options){
    this.$options = options || {}
    this._data = options.data || undefined
    // 数据变为响应式
    observe(this._data)
    this._initData() // 这里就是生命周期
    this._initComputed()
    this._initWatch()
    // 模板编译
    new Compile(options.el, this)
  }

  _initData(){
    var self = this
    Object.keys(this._data).forEach(key => {
      Object.defineProperty(self, key, {
        get(){
          return self._data[key]
        },
        set(newValue){
          self._data[key] = newValue
          return true
        }
      })
    })
  }

  _initComputed(){

  }

  _initWatch(){
    var watchers = this.$options.watch || {}
    Object.keys(watchers).forEach(watch => {
      var watchCb = watchers[watch]
      new Watcher(this._data, watch, watchCb)
    }) 
  }
}