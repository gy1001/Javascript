import { def } from "./utils"
import defineReactive from "./defineReactive"

export default class Observer{
  constructor(value){
    // 给实例(this, 注意：构造函数中的this 不是表示 类本身，而是表示实例) 添加了__ob__属性，值是这次 new 的实例
    //value.__ob__ // 这个属性应该是不可遍历属性
    def(value,'__ob__',this, false)
    this.walk(value)
  }

  // 遍历
  walk(value){
    for (const key in value) {
      defineReactive(value, key)
    }
  }
}