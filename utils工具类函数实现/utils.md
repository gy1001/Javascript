# 自定义工具函数库

## 1、函数相关

### 1.1 call/apply/bind

#### 1.1.1 call

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

