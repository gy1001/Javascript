[TOC]

## 飞机大战

1. 认识 Vue3
2. 构建<飞机大战>第一步

   - 使用 Custom render api 让视图渲染到 canvas 平台

3. 分析 vue3 初始化流程

### 为什么要学习 vue3

* 技术投资
* 国内最火技术
* 招聘需求(亮点)
* 弯道超车最好的时机

### Vue 3 亮点

* performance （比vue2 runtime 快了2倍）
* Tree shaking : 按需编译代码
* Ts support：更优秀的TS支持
* **Composition API: 组合API** 
* **Custom Renderer API ：自定义渲染器**
* 内置新特性组件

### 性能

* 重写了虚拟 DOM的实现
* 编译模板的优化（运行时候编译）[vue3 template explorer](https://vue-next-template-explorer.netlify.app/)
* Update 性能更高
* SSR速度提高

### Tree shaking

* 按需打包

### TypeScript Support

* 自动的类型定义提示

### Fragment

* 不再限于模版的单个根节点

### Composition API

* 灵活的逻辑组合与复用
* 响应式对象
  * ref
  * reactive
* 生命周期
  * onMounted
  * onUnmounted

### Custom Renderer API

* 解决了什么问题

  * 允许用户自定义渲染平台

* Vue 真实的渲染过程

  * <img src="/Users/gaoyuan/Library/Application Support/typora-user-images/image-20211130223804798.png" alt="image-20211130223804798" style="zoom:200%;" />

* API：

  > 在上述的由 vnode 转变为 真实element dom 可以使用以下方法实现自己的 转换渲染

  * createRenderer
  * 接口
    * createElement
    * insert
    * patchProp

### 为什么要学习Vue3

* 更快
* 更好

 ### 实现自定义的renderer

* canvas 和 vue3的碰撞
* Canvas ---> pixi.js
* 目标：vue3 结合 pixi.js 实现把图形会知道canvas上
