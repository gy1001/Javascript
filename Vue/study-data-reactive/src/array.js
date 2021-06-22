import { def } from "./utils"
// 得到 array 的原型
const arrayProperty = Array.prototype

// 以 Array.prototype 为原型创建 arrayMethods 对象
export const arrayMethods = Object.create(arrayProperty)
// push pop shift unshift splice sort reverse
const methodsNeedChange = [
  "push", "pop", "shift", "unshift", "splice", "sort", "reverse"
]

methodsNeedChange.forEach(methodName => {
  // 备份原来的方法, 原始方法不能被剥夺
  const originalMethods = arrayMethods[methodName]
  def(arrayMethods, methodName, function(){ 
    const result = originalMethods.apply(this, arguments)
    // 把这个数组身上的__ob__取出来，__ob__已经被添加了，为什么已经被添加了，因为数组本身肯定不是最高层，比如obj.g是数组，
    // obj不能是数组，第一次遍历obj这个对象时候的第一层的时候，已经给g属性增加了__ob__属性
    const ob = this.__ob__
    // 有三种方法：push, unshift, splice 能插入新项目，现要把新插入的新项目也要变为 observe 的
    let inserted = []
    switch (methodName) {
      case "push":
      case "unshift":
        inserted = arguments
        break;
      case "splice":
        // splice 语法参数(下标，数量，插入的新项)
        inserted = Array.prototype.slice.call(arguments, 2)
      default:
        break;
    }
    // 判断有没有插入的新项目, 让其也变为响应式的
    if(inserted.length > 0){
      ob.observeArray(inserted)
    }
    console.log(`调用了${methodName}方法`)  
    return result
  }, false)
})