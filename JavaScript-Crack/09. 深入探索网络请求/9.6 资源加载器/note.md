参考:

[IndexedDB_API ](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 提到了很多优秀的封装库

### 流程

1. 检查 idb 里面有没有对应的 key 值
2. 没有 ：走网络下载，创建访问 url, 并存入 idb
3. 有： 读取 idb 创建访问 url

### 思考

- fetch 或者 ajax 下载 blob 还是直接拦截 script 的 load 事件
- js 之间加载的顺序要求
- 所以资源加载完毕的回调
