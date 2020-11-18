这一篇，我们要实现一个事件绑定的功能

```html
<div @click="sayHello"></div>
```
那么为了实现这个功能，我们需要三步
1. 实现 compileDirectives 方法，可以从 attrs 中读取 directive 的配置，这里称之为 descriptor
2. 实现 Directive 类
3. 实现一个自定义指令 v-on

以 v-on 为例，如果碰到这样的一个属性 v-on:click="hello" 指令的初始化流程如下？
1. 遍历DOM
2. 对其中每一个 element 获取所有的 attributes
3. 遍历 attributes 如果 name 是以 v-on 开头的，那么就是一个绑定事件的指定，我们把相关的配置都存在descriptor 中
4. 遍历DOM结束，得到一个 descriptors 列表，其中存放了我们创建directive 时候需要的所有参数，比如 name value el等
5. 在bind 阶段，遍历 descriptors
6. 对每一个 descriptors, 创建一个 Directive
7. bind 结束，directive 初始化完成

关于 watcher 的实现以及如何在directive 中监听数据的变动，我们放到下一章来讲

### compileDirectives
在vue1.0 版本以前，是通过 Dom api 直接获取 attributes的，并通过对 name 的匹配来判断是哪一类 directive。在 vue2 中显然是通过
virtual DOM 的 API 来做的

那么我们按照上面的步骤来说，compileDirectives 负责其中 1-4步，即从 attributes 中生成一个 descriptors 列表

```javascript
const onRE = /^v-on:|^@/
const modelRE = /^v-model/
const textRE = /^v-text/
const dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/

export const compileDirectives = function (el, attrs) {
  if (!attrs) return undefined
  const dirs = []

  let i = attrs.length

  while (i--) {
    const attr = attrs[i]
    const name = attr.name
    const value = attr.value
    let arg = name
    if (name.match(dirAttrRE)) {
               if (onRE.test(name)) {
        arg = name.replace(onRE, '')
                    pushDir('on', dirOn)
               } else if (modelRE.test(name)) {
        arg = name.replace(modelRE, '')
                    pushDir('model', dirModel)
               } else if (textRE.test(name)) {
        arg = name.replace(textRE, '')
                    pushDir('text', dirText)
               }
    }

    function pushDir(dirName, def) {
      dirs.push({
        el: el,
        name: dirName,
        rawName: name,
        def: def,
        arg: arg,
        value: value,
        rawValue: value,
        expression: value
      })
    }
  }
  if (dirs.length) return makeNodeLinkFn(dirs)
}
```

上面这些代码都在 compile.js 中

获取了 discriptors 以后,我们就可以逐个创建 directive 了，那么显然，我们需要实现一个 Directive 类，他会接收这些
descriptor 并产生一个 directive 实例。
这里需要重点说明一下，vuejs 对每一个指令都会生成一个 directive 实例，那么既然有 directive 类，那么 directives 下面的
那么多指令是怎么回事呢？

我们可以把 Directive 类当做一个父类，他定义了所有指令通用的方法： _bind, _update 以及生成 watcher. 我们自己定义的比如 v-on
指令的实现，其实可以看做是他的一个子类，其中的 bind 和 update 分别会被 _bind 和 _update 调用。当然，在语法上其实并不是父类和子类的关系，语法上说，
Directive 会调用我们自定义的回调函数（update/bind）仅此而已。

Directive 类需要实现这几个功能：
* constructor 从 descriptor 中抽取所需的参数，比如 el, value expression等
* _bind 阶段调用 bind
  _生成一个——update 函数，负责调用 update
* 创建 this._watcher

我们直接贴上相关代码
```javascript
export default function Directive (descriptor, vm, el) {
  this.descriptor = descriptor
  this.vm = vm
  this.el = el
  this.expression = descriptor.expression
}

Directive.prototype._bind = function () {

  var def = this.descriptor.def
  if (typeof def === 'function') {
    this.update = def
  } else {
    extend(this, def)
  }

  if (this.bind) this.bind()
  if (this.update) this.update()

  if (this.update) {
    const dir = this
    this._update = function (val, oldVal) {
      dir.update(val, oldVal)
    }
  } else {
    this._update = function () {}
  }

  var watcher = this._watcher = new Watcher(
    this.vm,
    this.expression,
    this._update
  )
  // v-model with inital inline value need to sync back to
  // model instead of update to DOM on init. They would
  // set the afterBind hook to indicate that.
  if (this.update) {
    this.update(watcher.value)
  }   
}
```

这里注意创建 watcher 的代码，其中第三个参数 this._update 是 watcher 发现所观察的对象有所更新的时候会触发的回调
因为我们还未实现 Watcher 类，所以这里可以先把 Watcher 相关的代码注释掉，让我们实现一个自己的指令 v-on 吧
这个指令最精简的实现非常简单：在 bind  的时候调用 addEventListener 绑定一个回调即可
```javascript
export default {
  bind () {
    const el = this.descriptor.el
    if (this.descriptor.arg === 'click') {
      el.addEventListener('click', this.vm[this.descriptor.value].bind(this.vm))
    }
  }
}
```
显然这么简单的处理时不妥的，比如 addEventListener 不支持怎么办，如果用户更新了回调函数怎么办，什么时候应该注销？没关系，我们这里只是最精简版本，
暂时不用考虑那么全面

调用 compile 以及 new Directive 其实都是在 lifecycle 中完成的，代码很简单那大家直接去源码中看吧
赶紧绑定一个事件试试吧
