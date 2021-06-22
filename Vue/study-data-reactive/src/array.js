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
    console.log(`调用了${methodName}方法`)  
    originalMethods.apply(this, arguments)
  }, false)
})