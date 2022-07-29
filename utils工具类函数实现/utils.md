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

### 1.2 函数节流与函数防抖

#### 1.2.1 相关理解

* 事件频繁触发可能造成的问题？
  * 一些浏览器事件：window.onresize/window.mouseomove等，触发的频率非常高，会造成界面卡顿
  * 如果向后台发送请求，频繁请求，对服务器造成不必要的压力
* 如何限制事件处理函数频繁调用
  * 函数节流
  * 函数防抖
* 函数节流 throttle:
  * 理解
    * 在函数需要频繁触发时，函数执行一次后，只有大于设定的执行周期后才会执行第二次
    * 适合多次事件按平均时间做平均分配触发
  * 场景
    * 窗口调整 resize
    * 页面滚动 scroll
    * DOM元素的拖拽功能实现 mousemove
    * 抢购疯狂点击 click
* 函数防抖 debounce
  * 理解
    * 在函数需要频繁触发时：在规定时间内，只让最后一次生效，前面的不生效
    * 适合多次事件一次响应的情况
  * 场景
    * 输入框实时搜索联想 keyup/input
* 区别函数节流与防抖
  * 函数节流：n秒内只运行一次，若在n秒内重复触发，只有一次生效
  * 函数防抖：n秒后再执行该事件，若在n秒内重复触发，则重新计时

#### 1.2.2 API 说明

* throttle 节流
  * 语法：throttle(callback, wait)
  * 功能：创建一个节流函数，在wait 毫秒内最多执行 callback 一次
* debounce 防抖
  * 语法：debounce(callback, wait)
  * 功能：创建一个防抖动函数，该函数从上一次被调用后，延迟 wait 毫秒后调用 callback

#### 1.2.3 编码实现

1. 函数节流实现

   ```javascript
   function throttle(callback, wait) {
     // 定义开始时间
     let start = 0
     // 返回结果是一个函数
     return function (e) {
       // 只有距离上次处理的时间间隔超过了wait 时，才执行处理事件的函数
       const current = Date.now()
       if (current - start > wait) {
         callback.call(this, event) // 指定 this 和 参数
         start = current
       }
     }
   }
   
   // 调用方式
   window.addEventListener('scroll', throttle(function () {
       console.log(Date.now())
     }, 500)
   )
   ```

   

2. 函数防抖

   ```javascript
   // html:  <button id="btn">测试函数防抖</button>
   
   function debounce(callback, wait) {
     // 用来 保存定时器任务的标识 id
     let timerId = null
     return function (event) {
       if (timerId) {
         // 如果定时器存在就清除
         clearTimeout(timerId)
       }
       // 启动延迟 wait 时间后执行的定时器任务
       timerId = setTimeout(() => {
         // 调用 callback 处理事件
         callback.call(this, event)
         // 处理后重置定时器标识
         timerId = null
       }, wait)
     }
   }
   
   const btn = document.getElementById('btn')
   btn.onclick = debounce(function () {
     console.log('点击事件触发了')
   }, 500)
   ```

## 2、数组相关

### 2.1 数组声明式系列方式

#### map 函数

> 返回一个由回调函数的返回值组成的新数组

```javascript
// map 函数：接受一个数组 和 一个回调函数
function map(arr, callback) {
  const newArr = []
  for (let index = 0; index < arr.length; index++) {
    newArr.push(callback(arr[index], index))
  }
  return newArr
}
// 测试代码
const arr = [1, 2, 3, 4, 5, 6, 7, 8]
const result = map(arr, (item) => {
  return item * 10
})
console.log(result)
```

#### reduce 函数

> 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值

```javascript

function reduce(arr, callback, initValue) {
  let result = initValue
  for (let index = 0; index < arr.length; index++) {
    // 调用回调函数将返回的结果赋值给result
    result = callback(result, arr[index])
  }
  return result
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = reduce( arr, (prev, next) => {
    console.log(prev, next)
    prev.push(next * 2)
    return prev
  },
  []
)
console.log(result) // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] 
```

#### filter 函数

> 将所有在过滤函数中返回 `true`的 数组元素放进一个数组中并返回

```javascript
function filter(arr, callback) {
  const newArr = []
  for (let index = 0; index < arr.length; index++) {
    if (callback(arr[index], index)) {
      newArr.push(arr[index])
    }
  }
  return newArr
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = filter(arr, (item) => {
  return item % 2 === 0
})
console.log(result) // [2,4,6,8,10]
```

#### find 函数

> 找到第一个满足测试函数的元素并返回这个元素的值，如果找不到，则返回 undefined

```javascript
function find(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    if (callback(arr[index], index)) {
      return arr[index]
    }
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = find(arr, (item) => {
  return item % 2 === 0
})
console.log(result) // 2
```

#### findIndex函数

> 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，返回 -1

```javascript
 function findIndex(arr, callback) {
   for (let index = 0; index < arr.length; index++) {
     if (callback(arr[index], index)) {
       return index
     }
   }
   return -1
 }

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = findIndex(arr, (item) => {
  return item / 2 === 5
})
console.log(result) // 9
```

#### every 函数

> 如果数组中的每个元素都符合测试函数，则返回 true， 否则返回 false

```javascript
function every(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    // 只要有一个回调函数结果为false, 则立即返回 false
    if (!callback(arr[index], index)) {
      return false
    }
  }
  // 否则返回 true
  return true
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = every(arr, (item) => {
  return item > 0
})
console.log(result)
```

#### some 函数

> 如果数组中至少有一个元素满足测试函数，则返回 true， 否则返回false

```javascript
function some(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    if (callback(arr[index], index)) {
      return true
    }
  }
  return false
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = some(arr, (item) => {
  return item > 9
})
console.log(result)
```

### 2.2 数组去重

#### 2.2.1 API 说明

根据当前数组产生一个去重重复元素后的新数组

#### 2.2.2 实现思路

1. 利用 forEach 和 indexOf()
   * 说明：本质是双重遍历，效率差些
2. 利用 forEach() + 对象容器
   * 说明：只需一重遍历，效率高些
3. 利用 ES6 语法：from + Set 或者 ... + Set
   * 说明：编码简洁

#### 2.2.3 代码实现

1. 第一版：使用 forEach 和 indexOf 方法

   ```javascript
   function unique1(arr) {
     const newArr = []
     for (let index = 0; index < arr.length; index++) {
       if (newArr.indexOf(arr[index]) === -1) {
         newArr.push(arr[index])
       }
     }
     return newArr
   }
   
   const arr = [2, 3, 2, 7, 6, 7, 8, 9, 8, 9]
   const result = unique1(arr)
   console.log(result)
   ```

2. 第二版：使用 forEach 和 对象容器

   ```javascript
    function unique2(arr) {
      const newArr = []
      const newObj = {}
      for (let index = 0; index < arr.length; index++) {
        const item = arr[index]
        if (!newObj.hasOwnProperty(item)) {
          newObj[item] = true
          newArr.push(item)
        }
      }
      return newArr
    }
   
   const arr = [2, 3, 2, 7, 6, 7, 8, 9, 8, 9]
   const result = unique2(arr)
   console.log(result)
   ```

3. 第三版：使用 ES6 语法

   ```javascript
   function unique3(arr) {
     return [...new Set(arr)]
   }
   
   const arr = [2, 3, 2, 7, 6, 7, 8, 9, 8, 9]
   const result = unique3(arr)
   console.log(result)
   ```

### 2.3 数组合并与切片

#### concat()：合并函数

* 语法： var newArr =  concat(array, value1 [, value2, ...[,valueN]])

* 功能：将 n 个数组或值与当前数组合并在一个新数组，原始数组不会被改变

* 编码实现

  ```javascript
  function concat(arr, ...value) {
    const newArr = [...arr]
    value.forEach((item) => {
      if (Array.isArray(item)) {
        newArr.push(...item)
      } else {
        newArr.push(item)
      }
    })
    return newArr
  }
  
  const arr = [2, 3, 2, 7, 6, 7, 8, 9, 8, 9]
  const result = concat(arr, [10, 11], 12, 13, 14)
  console.log(result) // [2, 3, 2, 7, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 14]
  ```

#### slice()：切片函数

* 语法：var newArr = slice(array, [begin, [,end]])

* 功能：返回一个由 begin 和 end 决定的原数组的浅拷贝，原始数组不会被改变

* 编码实现

  ```javascript
  function slice(arr, begin, end) {
    // 如果当前数组是 [], 直接返回[]
    if (arr.length === 0) {
      return []
    }
    begin = begin || 0
    // 如果 begin 超过最大下标，直接返回[]
    if (begin >= arr.length) {
      return []
    }
  
    // 如果数组超过数组长度，则截取到数组长度
    end = end || arr.length
    if (end > arr.length) {
      end = arr.length
    }
    // 如果 end 小于 begin, 则直接返回 []
    if (end <= begin) {
      return []
    }
  
    const newArr = []
    // 取出下标在 [begin,end) 区间的元素，并保存到最终的数组中
    for (let index = begin; index < end; index++) {
      newArr.push(arr[index])
    }
    return newArr
  }
  
  const arr = [2, 3, 2, 7, 6, 7, 8, 9, 8, 9]
  const result = slice(arr)
  console.log(result)
  console.log(slice(arr, 2))
  console.log(slice(arr, 5))
  ```

### 2.4 数组扁平化

#### 2.4.1 API 说明

* 语法：flatten(array)
* 取出嵌套数组（多维）中的所有元素放到一个新数组中(一维)中
* 如：[1,[3,[2,4]]] => [1,2,3,4]

#### 2.4.2 编码实现

1. 方法1: 使用 递归 + reduce + concat

   ```javascript
   function flatten1(arr) {
     return arr.reduce((prev, item) => {
       if (Array.isArray(item) && item.some((cItem) => Array.isArray(cItem))) {
         return prev.concat(flatten1(item))
       } else {
         return prev.concat(item)
       }
     }, [])
   }
   
   const arr = [1, [3, [2, 4, [5, 65, 6, 7888, [8]]]]]
   const result = flatten1(arr)
   console.log(result) // [1, 3, 2, 4, 5, 65, 6, 7888, 8]
   ```

2. 方法2:  some + concat

   ```javascript
   function flatten2(arr) {
     // 先创建一个总数组
     let newArr = [].concat(...arr)
     // 遍历：只要数组中还有数组，就进行合并展开处理，直至数组中没有数组
     while (newArr.some((item) => Array.isArray(item))) {
       newArr = [].concat(...newArr)
     }
     return newArr
   }
   
   const arr = [1, [3, [2, 4, [5, 65, 6, 7888, [8]]]]]
   const result = flatten2(arr)
   console.log(result) // [1, 3, 2, 4, 5, 65, 6, 7888, 8]
   ```

### 2.5 数组分块

#### 2.5.1 API 说明

* 语法：chunk(array, size)

* 功能：将数组拆分为多个size长度的区块，每个区块组成小数组，整体组成一个二维数组

* 如 [1,3,5,6,7,8] 调用 chunk(arr, 4)  ====> [[1,3,5,6], [7,8]]

* 编码实现

  ```javascript
  function chunk(array, size) {
    if (array.length === 0) {
      return []
    }
    size = size || 1
    const bigArr = []
    let smallArr = []
    array.forEach((item) => {
      if (smallArr.length === 0) {
        bigArr.push(smallArr)
      }
      smallArr.push(item)
      // 巧妙的用到了地址引用
      if (smallArr.length === size) {
        smallArr = []
      }
    })
    return bigArr
  }
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  console.log(chunk(arr, 4)) // [[1, 2, 3, 4], [5, 6, 7, 8]， [9, 10], [9, 10]]
  
  
  // 上述示例涉及到一个地址引用的情况，会有一定的理解代价，可以更简单一点，如下
  function chunk2(array, size) {
    const outPutArr = []
    const forTime = Math.ceil(array.length / size)
    for (let i = 0; i < forTime; i++) {
      outPutArr.push(array.slice(i * size, (i + 1) * size))
    }
    return outPutArr
  }
  console.log(chunk2([1, 2, 3, 4, 5, 6, 7], 3))
  ```

### 2.6 数组取差异

#### 2.6.1 API 说明

* 语法：difference(arr1, arr2)

* 功能：得到当前数组中所有不在 arr 中的元素组成的数组(不改变原数组)

* 例子：difference([1,3,5,7,8], [5,8]) ===> [1,3,7]

* 编码实现

  ```javascript
  function difference(arr1, arr2) {
    if (arr1.length === 0) {
      return []
    } else if (arr2.length === 0) {
      return arr1
    }
    return arr1.filter((item) => arr2.indexOf(item) === -1)
  }
  
  console.log(difference([1, 3, 4, 5, 7, 8], [1, 5, 8, 3])) // [4, 7]
  ```

### 2.7 删除数组中部分元素

#### 2.7.1 pull (array, ...values)

* 删除原数组中与 value 相同的元素，返回所有删除元素的数组

* 说明：原数组发生了改变

* 如 pull([1,3,5,3,7],2,7,3,7) ====> 原数组变为 [1,5] 返回值为 [3,3,7]

* 编码实现

  ```javascript
  function pull(arr1, ...values) {
    if (arr1.length === 0 || values.length === 0) {
      return []
    }
    const result = []
    for (let index = 0; index < arr1.length; index++) {
      const element = arr1[index]
      if (values.indexOf(element) !== -1) {
        arr1.splice(index, 1)
        result.push(element)
        index--
      }
    }
    return result
  }
  
  var arr = [1, 3, 5, 3, 7]
  console.log(pull(arr, 2, 7, 3, 7)) // [3, 3, 7]
  console.log(arr) // [1, 5]
  ```

  

