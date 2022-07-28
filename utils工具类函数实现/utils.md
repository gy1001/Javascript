# 自定义工具函数库

## 1、函数相关

### 1.1 call/apply/bind

#### 1.1.1 call 函数封装实现

* 语法：call(fn, obj, ...args)
* 功能：执行 fn ，使 this 指向为 obj， 并将后面的 n个参数传给 fn(功能等同于函数对象的calll方法)

```javascript
function call(fn, obj, ...args) {
  if (obj === undefined || obj === null) {
    // 根据 mdn 文档，this 为 undefined 或者 null 指向 全局对象
    obj = globalThis // globalThis 表示当前全局对象 ，window 或者 node
  }
  // 为 obj 添加临时的方法
  obj.temp = fn
  // 调用 temp方法
  let result = obj.temp(...args)
  // 删除 temp 属性方法
  delete obj.temp
  // 返回执行结果
  return result
}

// 测试代码

// 声明一个函数
function add(a, b) {
  console.log(this)
  return a + b + this.c
}
// 声明一个对象
let obj = {
  c: 521,
}

// 添加全局属性
window.c = 1314

// 执行 call 函数

let result = call(add, obj, 3, 4)
console.log(result)
const result2 = call(add, null, 31, 4)
console.log(result2)

// 原生函数的 call 方法
console.log(add.call(obj, 3, 4))
console.log(add.call(null, 31, 4))
```

#### 1.1.2 apply 函数封装实现

* 语法：apply(fn, obj, args)
* 功能：执行 fn, 使 this 为 obj, 并将 args 数组中的元素传给 fn（功能等同于函数对象的apply方法）

```javascript
 // args 是一个数组类型
function apply(fn, obj, args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  // 为 obj 添加 临时方法
  obj.temp = fn
  // 执行方法
  const result = obj.temp(...args)
  // 删除 temp 属性方法
  delete obj.temp
  return result
}

// 声明一个函数
function add(a, b) {
  console.log(this)
  return a + b + this.c
}
// 声明一个对象
let obj = {
  c: 521,
}

// 添加全局属性
window.c = 1314

// 执行 apply 函数
let result = apply(add, obj, [3, 4])
console.log(result)
const result2 = apply(add, null, [31, 4])
console.log(result2)

// 原生函数的 apply 方法
console.log(add.apply(obj, [3, 4]))
console.log(add.apply(null, [31, 4]))
```

#### 1.1.3 bind函数封装实现

* 语法：bind(fn, obj, ...args)
* 功能：给fn 绑定 this 为 obj，并制定参数为后面的 n个参数(功能等同于函数对象的bind 方法 )

```javascript
// 实现方式依赖 call
function call(fn, obj, ...args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  obj.temp = fn
  let result = obj.temp(...args)
  delete obj.temp
  return result
}

function bind(fn, obj, ...args) {
  // 返回一个新的函数
  return function (...args2) {
    // 指向 call 函数, 注意参数的顺序
    return call(fn, obj, ...args, ...args2)
  }
}

// 声明一个函数
function add(a, b) {
  console.log(this)
  return a + b + this.c
}
// 声明一个对象
let obj = { c: 521 }

// 添加全局属性
window.c = 1314

// 执行 bind 函数
let result = bind(add, obj, 3, 4)()
console.log(result)
const result2 = bind(add, null)(10, 20)
console.log(result2)

// 原生函数的 apply 方法
console.log(add.bind(obj, 3, 4)())
console.log(add.bind(null)(10, 20))
```

### 1.1.2 实现说明

* 区别：call/apply/bind
  * call(obj)/apply(obj)：调用函数，指定函数中的 this 为第一个参数的值
  * bind(obj)：返回一个新的函数，新函数内部会调用原来的函数，且 this 为 bind() 指定的第一参数的值
  * 注意：如果obj 是 null/undefined, this 指向 全局对象 window / node
* 应用
  * call/apply 应用：根据伪数组生成真数组
  * bind应用: react 中组件的自定义方法、vue中的事件回调函数内部
* 自定义 call/apply
  * 给 obj 添加一个临时方法，方法名任意，值为当期函数
  * 通过obj 调用这个临时方法，并将接收的参数传入
  * 删除 obj 上的这个临时方法属性
* 自定义 bind
  * 返回一个新函数
  * 在新函数内部通过原函数对象的call方法来执行原函数
  * 指定原函数的 this为 obj
  * 指定参数为 bind 调用的参数和后面新函数调用的参数
