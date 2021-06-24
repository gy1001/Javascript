var wId = 0
import Dep from "./Dep"
export default class Watcher{
  constructor(target, expression, callback){
    console.log('i am Watcher Class')
    this.id = wId++
    this.target = target
    this.getter = this.parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }

  update(){
    console.log('watcher 的 update')
    this.run()
  } 

  get(){
    // 进入依赖收集本身, 让全局的Dep 设置为 watcher 本身
    Dep.target = this
    const obj = this.target
    var value;
    try {
      // 只要能找到，就一直找
      console.log(value,obj, 333333)
      value = this.getter(obj)
    } finally{
      Dep.target = null
    }
    return value
  } 

  run(){
    this.getAndInvoke(this.callback)
  }

  getAndInvoke(cb){
    const value = this.get()
    if(value !== this.value || typeof value === "object"){
      const oldValue = this.value
      this.value = value 
      cb.call(this.target, value, oldValue)
    }
  }

  parsePath(str){
    var segments = str.split(".")
    return (obj ) => {
      for (let index = 0; index < segments.length; index++) {
        if(!obj){
          return 
        }
        obj = obj[segments[index]]
      }
      return obj
    }
  }



}