## Axios 从入门到源码解析

### 1. axios 的理解和使用

#### 1.1 axios 是什么

> 前端最流行的 ajax 请求库

#### 1.2 前置知识

> promise 、 axios

#### 1.3 使用 JSON-SERVER 搭建一个服务

1. [github地址](https://github.com/typicode/json-server)

2. 执行命令

   ```code
   npm install json-server -D
   ```

3. 创建db.json文件

   ```json
   {
     "posts": [
       { "id": 1, "title": "json-server", "author": "typicode" }
     ],
     "comments": [
       { "id": 1, "body": "some comment", "postId": 1 }
     ],
     "profile": { "name": "typicode" }
   }
   ```

   

4. Start JSON Server

   ```code
   npx json server --watch db.json
   ```

5. Now if you go to http://localhost:3000/posts/1, you'll get

   ```json
   { "id": 1, "title": "json-server", "author": "typicode" }
   ```

   

