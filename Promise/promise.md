## promise 介绍与基本使用

### 1. Promise 是什么

#### 1.1 理解

1. 抽象表达
   * Promise 是一门新的技术(ES6规范)
   * Promise 是 JS 中进行异步编程的新解决方案（备注：旧方案是单纯使用回调函数）
     * 异步操作
       * fs文件操作
       * 数据库操作
       * AJAX
       * 定时器
2. 具体表达：
   * 从语法上来说：Promise 是一个构造函数
   * 从功能上来说：Promise 对象用来封装一个异步操作并可以获取其成功、失败的结果值

####  1.2 promise 的状态

> promise 是一个属性：promiseState： pending/resolved/rejected

1. pending 变为 resolved（fullfield）
2. pending 变为 rejected

说明：

只有这2种，且一个promise 对象只能改变一次，

无论变为成功还是失败，都会有一个结果数据。

成功的结果数据一般称为value, 失败的结果数据一般称为 reason

#### 1.3 promise 的对象的值

> 实例对象中的另一个属性:  promiseResult

保存着对象的[成功/失败]的结果

* resolve
* reject

#### 1.4 promise 的 基本流程

1. 创建：new Promise() ，注意：此刻是pending 状态
2. 执行异步操作
   * 成功了，执行 resolve()
     * promise 对象 变为 resolved 状态
     * 指向 .then() ：回调 onResolved()
     * 最后指向 新的 promise 对象
   * 失败了，执行 reject()
     * promise 对象 变为 reject 状态
     * 指向 .then()/.catch()  回调 onRejected()
     * 最后指向新的 promise 对象

### 2. 为什么要使用 Promise

#### 2.1 指定回调函数的方法更加灵活

1. 旧的：必须在异步任务前指定
2. promise: 启动异步任务 =》返回 promise 对象 =》给 promise 对象绑定回调函数（甚至可以在异步任务结束后指定多个）

#### 2.2 支持链式调用，可以解决回调地狱问题

1. 什么是回调地狱

   > 回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件

   ```javascript
   asyncFunc1(opt1,(...arg1) => {
     asyncFunc2(opt2, (...arg2) => {
       asyncFunc3(opt3, (...arg3) => {
         // to do something
       })
     })
   })
   ```

2. 回调地狱的缺点

   * 不便于阅读
   * 不便于异常处理

3. 解决方案

   * promise 链式调用
   * async/await: 回调地狱的终极解决方案

4. Promie的缺点

   * 无法取消 promie, 一旦新建它就会立即执行，无法中途取消
   * 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
   * 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

#### 2.3 如何使用 Promise

##### 2.3.1 API

1. Promise 的构造函数：Promise(executor) {}

   * executor 函数： 执行器 (resolve, reject) => {}

   * resolve 函数：内部定义成功时我们调用的函数：value => {}

   * reject 函数：内部定义失败时我们调用的函数：reason => {}

     说明：executor 会在 Promise 内部立即同步调用，异步操作在执行器中执行

2. Promise.prototype.then 方法: (onResolved, onRejected) => {}

   * onResolved 函数：成功的回调函数：(value) => {}

   * onRejected 函数：失败的回调函数：(reason) => {}

     说明：指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调，返回一个新的 promise 对象

3. Promise.prototype.catch 方法：（onRejected） => {}

   * onRejected 函数：失败的回调函数 （reason） => {}

     说明：then()的语法糖，相当于 then(undefined, onRejected)

4. Promise.resolve 方法: (value) => {}

   * value: 成功的数据或者 promie 对象

     说明：返回一个失败/成功的 promise 对象

5. Promise.reject 方法：（reason） => {}

   * reason : 失败的原因

     说明：返回一个失败的 promise 对象

6. Promise.all 方法：（promises）=> {}

   * promises：包含n个promise的数组

     说明：返回一个新的promise, 只有所有的promise都成功才成功，只要有一个失败了就直接失败

7. Promise.race 方法：(promises) => {}

   * 

## Promise API



## Promise 关键问题



## Promise 自定义封装



## async 与 await
