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
   * 

## Promise API

## Promise 关键问题

## Promise 自定义封装

## async 与 await
