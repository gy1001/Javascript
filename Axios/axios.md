## Axios 从入门到源码解析

### 1. axios 的理解和使用

#### 1.1 axios 是什么

> 前端最流行的 ajax 请求库

#### 1.2 前置知识

> promise 、 axios

#### 1.3 使用 JSON-SERVER 搭建一个服务

1. [github 地址](https://github.com/typicode/json-server)

2. 执行命令

   ```code
   npm install json-server -D
   ```

3. 创建 db.json 文件

   ```json
   {
     "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
     "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
     "profile": { "name": "typicode" }
   }
   ```

4. Start JSON Server

   ```code
   npx json server --watch db.json
   npx json-server --watch db.json --delay 2000 延迟2s返回结果
   ```

5. Now if you go to http://localhost:3000/posts/1, you'll get

   ```json
   { "id": 1, "title": "json-server", "author": "typicode" }
   ```

## 查看源码

### 1.1 axios 与 Axios 的关系

1. 从语法上来说：axios 不是 Axios 的 实例
2. 从功能上说：axios 是 Axios 的实例
3. axios 是 Axios.prototype.request 函数 bind 返回的函数
4. axios 作为对象由 Axios 原型对象上的所有方法，有 Axios 对象上所有属性

### 1.2 instance 与 axios 的区别

- 相同
  - 都是一个能发任意请求的函数：request(config)
  - 都有发特定请求的各种方法: get、post、put、delete
  - 都有默认配置和拦截器的属性: defaults/interceptors

* 不同：
  - 默认配置很可能不一样
  - instance 没有 axios 后面添加的一些方法：create 、 CancelToken、all 等

### 1.3 拦截器是什么，有哪些

#### 1.3.1 请求拦截器

1. 在真正请求发送前执行的回调函数
2. 可以对请求进行检查或者配置进行特定处理
3. 成功的回调函数，传递的默认是 config(也必须是)
4. 失败的回调函数，传递的默认是 error

#### 1.3.2 响应拦截器

1. 在请求得到响应后执行的回调函数
2. 可以对响应数据进行特定处理
3. 成功的回调函数，传递的默认是 response
4. 失败的回调函数，传递的默认是 error

### 1.4 axios 的请求/响应数据转换器是什么?

1. 请求转化器：对请求头和请求体数据进行特定处理的函数

```javascript
if (utils.isObject(data)) {
  setContentTypeIfUnset(headers, 'application/json;charset=utf-8')
  return JSON.stringfy(data)
}
```

2. 响应转换器：将响应体 json 字符串解析为 js 对象或者数组的函数

```javascript
response.data = JSON.parse(response.data)
```

## 1.5 response 的整体结构

## 1.6 error 的整体结构

## 1.7 如何取消未完成的请求

1. 当配置了 cancelToken 对象时候，保存 cancel 函数
   - 创建一个用于将来中端请求的 cancelPromise
   - 并定义了一个用于取消请求的 cancel 函数
   - 将 cancel 函数传递出来
2. 调用 cancel 函数
   - 执行 cancel 函数， 传入错误信息 message
   - 内部会让 cancelPromise 变为成功，且成功的值为一个 Cancel 对象
   - 在 cancelPromise 的成功回调中中断请求，并让请求的 promise 失败，失败的 reason 为 Cancel 对象
