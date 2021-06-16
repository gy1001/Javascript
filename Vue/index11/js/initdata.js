let ARRAY_METHOD = [
  "push",
  "pop",
  "shift",
  "unshift",
  "reverse",
  "sort",
  "splice"
]
let array_method = Object.create(Array.prototype)
ARRAY_METHOD.forEach(method => {
  array_method[method] = function(){
    // 这里增加改写的方法 
    // 在这里将数据进行响应式化
    console.log("调用的是拦截器中的"+method+"的方法")
    // 循环 arguments ，变为响应式
    for (let index = 0; index < arguments.length; index++) {
      const element = arguments[index];
      observe(element, 'xxxx') // 这里得不到vm实例，等到watcher 后完成
    }  
    // 调用原来的方法
    let res =  Array.prototype[method].apply(this, arguments)
    return res
  }
})



// 响应式化的部分
function defineReactive(target,key,value,enumerable){
  let that = this
  if(typeof value === "object" && value !== null){
    // 是一个非数组的引用类型
    observe(value)  // 递归调用 
  }
  // 函数内部就是一个局部作用域，这个value就只限于函数内使用的变量（闭包）
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: !!enumerable,
    get(){
      console.log(`读取了${key}属性`)
      return value
    },
    set(newValue){
      console.log(`设置了${key}属性为${newValue}`)
      value = newValue
      // 目的，将重新赋值的数据进行响应式，因此如果传入的是对象类型，那么就需要使用 observe 函数将其转换为 响应式
      if(typeof newValue === "object" && newValue !== null){
        observe(newValue)
      }
      // 这里进行模板刷新(即可实现界面响应化，这里是假的，只是演示)
      // vue实例中是利用watcher，这里暂时没有
      // 因为 数组现在没有传入实例 
      typeof that.mountComponent === "function" && that.mountComponent()
      return true
    }
  })
}

// 将对象o变成响应式，vm就是vue实例，为了调用时处理上下文
function observe(obj, vm){
  // 之前没有对 o 本身进行操作，这一次直接对 o 进行判断
  if(Array.isArray(obj)){
    // 对其每一个元素进行处理
    obj.__proto__ = array_method
    for (let index = 0; index < obj.length; index++) {
      const element = obj[index];
      observe(obj[index], vm) // 递归每一个数组元素
    }
  }else{
    // 对其成员处理
    let keys = Object.keys(obj)
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]; // 属性名
      defineReactive.call(vm, obj, key, obj[key], true)
    }
  }
}





// 将 某一个对象的属性访问 映射到 对象的某一个属性成员上
function proxy(target, prop, key){
  Object.defineProperty(target,key, {
    enumerable: true,
    configurable: true,
    get(){
      return target[prop][key]
    },
    set(newValue){
      target[prop][key] = newValue
      return true
    }
  })
}

JGVue.prototype.initData = function(){
  // 遍历 this._data 的成员 将属性转换为响应式的，将直接属性 代理到实力上
  let keys = Object.keys(this._data)
  observe(this._data, this)
  // 响应式
  for (let index = 0; index < keys.length; index++) {
    // 这里将对象 this._data[Keys[index]] 变成响应式的
    //const key = keys[index];
    //reactify(this._data[key], this)
    //this.observer(this._data, keys[i])
  }
  // 代理
  for (let index = 0; index < keys.length; index++) {
    // 这里将 this._data[keys[i]] 映射到 this[keys[i]] 上
    const elementKey = keys[index];
    proxy(this, "_data", elementKey)
  }
}