// watcher 观察者，用来发射 更新的行为
class Watcher{
  /**
   * 
   * @param {*} vm  vue实例
   * @param {*} expOrFn 渲染函数或者路径表达式
   * @param {*} cb 回调函数
   */
  constructor(vm,expOrFn,cb){
    this.vm = vm
    this.getter = expOrFn

    this.deps= [] // 依赖项
    this.depIds = {} // 是一个set类型，用于保证依赖性的唯一性(简化代码暂时不实现)

    // 一开始需要渲染：真实 vue 中： this.lazy ? undefined : this.get()
    this.get()
  }

  get(){
    this.getter.call(this.vm, this.vm) // 上下文的问题就就解决了
  }

  // 执行，并判断是懒加载，还是同步执行，还是异步执行
  run(){
    this.get()
  }

  // 对外公开的函数，用于在 属性发生变化时候触发的接口
  update(){
    this.run()
  }

  // 清空依赖队列
  cleanupDep(){
    
  }

}