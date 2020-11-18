### vuejs 架构


#### 什么是vuejs
这里更多指的是原版的vuejs 架构，当然tinyvue 也是一样的
我个人对vuejs的定义是：通过 directives 实现 data 和 dom 的关联的一个架构

如果用一张图来定义大概是这样的
Data <---> Directive <---> DOM

更为复杂点的是如下

        -- Data <--------------------------- Directive  <---------->  DOM
        |                                           |
        --> Observer -----> Dep -----> Watcher  ---->

当然这里的 data 是广义的， 包括初始化组件时候传入的 data, props， methods, computed 等一系列的方法和属性，把这些东西 和 DOM 
做关联，做到联动，是 vuejs 的核心功能

#### 数据响应化
这里说的是data 的响应化，props 暂时我们不管
从 /instance/vue.js 开始看，会发现他的除了 init 之外，第一个调用的是 stateMixin

stateMixin 主要做了两件事
1. proxy 把对 this.xxx 的访问代理到 this._data.xxx 上, 通过 getter 和 setter 实现的
2. observe(this._data) 把 this._data 变成响应式的数据

observe(this._data) 做了什么呢，他主要是对传入的 data 设置了 getter 和 setter, 这样对 data 的访问会先触发对应的 getter/setter,因此
当数据有读写操作的时候都可以检测到

 data ------------------> proxy -----------------------> observe
 initial data           proxy this.xxx to           Define getter/setter 
                        this._data.xxxx             on this._data, collect deps
                        Using getter/setter
可以看一下一个很有意思的细节
observer/index.js
```javascript
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  get: function reactiveGetter(){
    var value = getter ? getter.call(obj) : val
    if(Dep.target){
      dep.depend()
      // ....
    }
    return value
  }
})
```
其中 Dep.target是一个全局的属性，每当 watcher.get 调用的时候机会把自己设置上去，调用完就消失
所以如果存在 Dep.target, 那么说明当前一个 watcher 是这里取值的，也就是这个 watcher 依赖这个 dep ,
于是就有了 dep.depend() 会把 watcher 加入 deps 依赖

这是一个很巧妙的设计：在 getter 中收集依赖 比如 v-text="name" 那么肯定会调用一次 getter 获取name
因此就可以确定这个指令是依赖 name 属性的

#### Directive 
Directive 的实现要比 data 更复杂一些，我画了一个图：


Compile | Bind |  New Watcher | Dep | Observer |
---------|----------|---------|---------|----------|---------|
 Retrive attributes by DOM API, create Directive for each v-*     | Bind directive,call dir.bind, dir.update  | create watcher,watch data change watcher will call dir._update when data change |  Dependencies: watcher => observer | Observe data change and notify watcher use dep

按照 Directive 的生命周期来说
1. 在 compile 阶段，会通过 el.attributes 来获取所有的 attributes 并且通过正则匹配 name 的 方式筛选出类似 v-xxx 的指令，生成一个指令的描述 descriptor 这个描述就包含了name value def 等等以后需要创建指令的时候传入的参数
2. 在 _bindDir 阶段会根据上一步收集的指令描述来创建指令 new Directive 并最终逐个调用指令的 _bind 方法
3. 在指令的 _bind 方法中，会创建 watcher 监听对应的表达式，比如 v-text="name" 会监听 name 表达式，当 this.name 改变时候，会由 Observer 通过 dep 来通知 watcher ，然后 watcher 调用 directive 的 update 方法
这里有个很有意思的事情，watcher 是为了监听一个值而创建的，但是 watcher 本身会把这个值存起来，所以后面访问的时候不是 vm.name 而是 watcher.name 的形式访问的

Dep 存在的意义就是，他记录了 watcher 和 Observer 之间的依赖关系，是二者的一个桥梁
源码中 compile 的时候有很多这样的 link 回调
```javascript 
return function compositeLinkFn(vm, el, host, scope, frag){
  // cache childeNodes before linking parent fix #657
  var childNodes = toArray(el.childNodes)
  // link
  var dirs = linkAndCapture(function compositeLinkCapturer(){
    if(nodeLinkFn){ nodeLinkFn(vm, el, host, scope, frag) }
    if(childLinkFn){ childLinkFn(vm, childeNodes, host, scope, frag) }
  }, vm)
  return makeUnLinkFn(vm, dirs)
}
```
返回的函数套着函数，很容易让人一头雾水，其实这样做主要是因为在link 的时候依赖 scope 等参数，其实并没有传给 compile 因此需要返回一个函数，在需要时候在调用这个函数并传入对应的参数。

关于vuejs的架构先将这么多，没有理解没关系，下面我们在动手写 tinyvue 的时候就会懂了