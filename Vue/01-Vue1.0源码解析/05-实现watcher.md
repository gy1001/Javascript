我们已经实现了 Observe 和 Directive 并且自己实现了一个 v-on的指令，那么在实现 Dep 和 Watcher 就完整了，

这里的 dep.js 其实就是一个记录依赖关系的，他有一个内部的数组 subs 会把所有依赖的 watcher 记录在里面，然后 observer 在观察到
数据改变的时候，就告诉 dep, 他会负责遍历 subs 并调用他们的 update 也就是通知所有相关的 watcher 

所以代码这里就不贴了，大家可以直接去看源码，这也是唯一一个我没有自己实现而是从 vuejs 中复制过来的

那么现在我们自己实现一个 Watcher 类
首先定义我们的scope watcher 到底要做什么
还记得上一篇我们的 Directive 类吗，他会拿到一个 descriptor 作为参数, 而他依赖watcher来知道什么时候需要执行update，那么什么时候执行update
呢？显然是指令表达式中的值更新了就需要执行 update
举个例子

```html
hello <span v-tex="name"></span>
```
这里通过v-text 指令绑定了this.name, 那么当name更新时候需要更新dom， 如何更新 dom 我们这里不用关心，这是 v-text 指令中实现的，我们关心的是调用他的update方法

所以我们的 watcher 需要知道这些
1. vm 也就是vue 实例，因为我们需要通过获取vm.name 取值。
2. expression 也就是 name 这个字符串，这样我们才知道取得是name， 也能知道要观察他的变动。
3. callback 也就是 directive.update
```javascript
export default function Watcher (vm, expOrFn, cb) {
  vm._watchers.push(this)
  this.vm = vm
  this.expOrFn = expOrFn
  this.expression = expOrFn
  this.cb = cb
  this.id = ++uid // uid for batching
  this.deps = []
  this.depIds = new Set()

  // TODO: support expression, like: "'Hello' + user.name"
  this.getter = () => {
    return vm[expOrFn]
  }
  this.setter = (vm, value) => {
    return vm[expOrFn] = value
  }

  this.value = this.get()
}

Watcher.prototype.update = function () {
  this.run()
}
Watcher.prototype.run = function () {
  const value = this.get()
  const oldValue = this.value

  if (value !== oldValue) {
    this.cb.call(this.vm, value, oldValue)
  }
}
Watcher.prototype.get = function () {
  Dep.target = this
  const value = this.getter.call(this.vm, this.vm)
  Dep.target = null
  return value
}
Watcher.prototype.set = function (value) {
  return this.setter.call(this.vm, this.vm, value)
}
Watcher.prototype.addDep = function (dep) {
  if (!this.depIds.has(dep.id)) {
    this.deps.push(dep)
    this.depIds.add(dep.id)
    dep.addSub(this)
  }
}
```
有几点需要注意的
1. getter 和 setter 
为了方便起见，我们做了一个非常非常非常简单的 getter 和setter 所以我们不支持 v-text="'hello' + name" 这样的表达式。对表达式的支持，在vuejs中做了非常详尽的处理，其中包含如何处理 people.name 这样路径。就是勾三股四那篇文章的图示讲的内容，有兴趣可以看下，其实是一个[自动状态机](https://jiongks.name/blog/vue-code-review/)
2. addDep 是干什么的
这里是强调了很多遍的地方，adddep 是把自己加到deps 的依赖里，这涉及到vuejs 的解析依赖的机制
在vuejs 中，对一个表达式比如 name + age, 他的依赖并不是通过解析这个表达式的时候获取的，而是在计算他们的值的时候记录的。也就是说 在计算这个表达式的时候，有哪些watcher 正在执行get, 就会把他们记录了为对当前 observer 的依赖。

observer 中下面的代码就是干这个的
```javascript
Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val
      if (Dep.target) { //.. 当前有一个watcher正在执行 get 方法，那么他肯定依赖这个observe
        dep.depend()
      }
      return value
    }
```
所以 watcher 的get函数开始的时候就会执行
```javascript
Dep.target = this
```
get结束的时候会设置为 null
请务必理解并来牢记，这是一个非常巧妙的设计

3 关于 batcher
这里我们省略了batcher 相关的内容，其实细心的读者应该就会发现 update 里面直接调用了 run 那么为什么不直接写成一个函数呢，其实这是因为我们省略了一个非常重要的性能优化：batcher。 他会把一个tick的变动全部合并执行，而不是每次改动执行一次dom的更新

vuejs 是这么实现的
```javascript
Watcher.prototype.update = function (shallow) {
if (this.lazy) {
this.dirty = true
} else if (this.sync || !config.async) {
this.run()
} else {
//….
pushWatcher(this)
}
}
```
只有 sync 模式的时候会执行 run，也就是更新dom，默认的async 模式下只是把 watcher 加入一个队伍，在nextTick 的时候 会统一把队列中的watcher 都执行
也即是默认情况下，vuejs 会在 nexttick 的时候才更新dom, 所以我们有数据更新以后立刻获取dom的值坑可能是旧的哦

这一点非常重要，请务必牢记

到这里为止，我们不仅可以创建 directive 而且当 directive 表达式的值改变的时候，还会执行他的 update 函数，所以我们就能实现更多的指令了

下一篇我们实现两个常用的指令 ： v-text 和  v-on
