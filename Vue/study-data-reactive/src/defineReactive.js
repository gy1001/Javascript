import { observe } from "./observe"
import Dep from "./Dep"

export default function defineReactive(data, key, val){
  const dep = new Dep()
  if(arguments.length == 2){
    val = data[key]
  }
  // 子元素要进行 observe , 至此形成了递归，这个递归不是自己调用自己，而是多个函数和类循环调用
  let childOb = observe(val)
  Object.defineProperty(data, key, {
    enumerable: true, // 可以枚举
    configurable: true, // 可以被配置，比如可以被delete
    set(newValue){
      if(newValue === val){
        return 
      }
      console.log(`你试图改变${data}的${key}属性`)
      val = newValue
      // 当设置了新值的时候，这个新值也需要进行响应化
      childOb = observe(newValue)
      // 发布订阅模式，通知dep
      dep.notify()
      return true
    },
    get(){
      console.log(`你试图访问${data}的${key}属性`)
      dep.depend()
      if(childOb){
        childOb.dep.depend()
      }
      return val
    }
  })
}