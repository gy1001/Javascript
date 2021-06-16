class Dep {
  constructor(){
    // this.id = i++
    this.subs = []  // 存储的是与 当前 Dep 关联的 watcher
  }

  // 添加一个watcher
  addSub(){

  }

  // 移除
  removeSub(){

  }

  // 将当前 Dep 与当前的 watcher (暂时渲染 watcher) 关联
  depend(){

  }

  // 触发与之关联的watcher的update 方法，起到更新的作用
  notify(){
    if(Dep.target){
      Dep.target.update()
    }
  }
}


// 全局的容器存储渲染 watcher 
// let globalWatcher
// 学vue的实现
Dep.target = null // 这是全局的watcher