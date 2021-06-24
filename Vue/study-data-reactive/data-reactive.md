## 数据响应式
> 上帝的钥匙 Object.defineProperty

## 实现数组的响应式
> 被改写的方法：push pop shift unshift splice sort reverse
> const arrayMethods = Array.prototype
> Object.setPrototypeOf(o, arrayMethods)
> o.__proto__ = arrayMethods 



##  什么是依赖
1. 用到数据的地方，成为依赖
2. Vue1.x **细粒度**依赖，用到数据的 **DOM** 都是依赖
3. Vue2.x **中等粒度**依赖，用到数据的**组件**是依赖
4. **在getter中收集依赖，在setter中触发依赖**

## Dep类和Watcher类
1. 把依赖和收集的代码封装成一个Dep类，它专门用来管理依赖，**每个 Observer 的实例，成员中都有一个 Dep 的实例**
2. Watcher  是一个中介，数据发生变化时通过 Watcher 中转，通知组件
3. 依赖就是 Watcher. 只有 Watcher 触发的 getter 才会收集依赖，哪个 Watcher 触发了 getter，就把哪个 Watcher 收集到 Dep 中
4. Dep 使用发布订阅模式，当数据发生变化时候，会循环依赖列表，把所有的 Watcher 都通知一遍
5. 代码实现的巧妙之处：Watcher 把自己设置到全局的一个指定位置，然后读取数据，因为读取了数据，所以会触发这个数据的getter. 在getter中就能得到当前正在读取数据的Watcher,并把这个 Watcher 收集到 Dep 中。
