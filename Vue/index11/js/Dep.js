let depId = 0;
class Dep {
  constructor(){
     this.id = depId++
    this.subs = []  // 存储的是与 当前 Dep 关联的 watcher
  }

  // 添加一个watcher
  addSub(sub){
    this.subs.push(sub)
  }

  // 移除
  removeSub(sub){
    for (let index = this.subs.length-1; index >=0; index--) {
      if(this.subs[index] === sub){
        this.subs.splice(index, 1)
        return 
      }
    }
    //this.subs = this.subs.filter(subItem => sub)
  }

  // 将当前 Dep 与当前的 watcher (暂时渲染 watcher) 关联
  depend(){
    // 将当前的 dep 与当前的 watcher 相互关联
    if(Dep.target){
      this.addSub(Dep.target) // 将当前的 watcher 关联到当前的 dep 上
      Dep.target.addDep(this) // 将 当前的 dep 与当前的 渲染 watcher 关联起来
    }
  }

  // 触发与之关联的watcher的update 方法，起到更新的作用
  notify(){
    // 在真实的vue中是依次触发 this.subs 中的 watcher 的 update 方法
      //Dep.target.update()
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}


// 全局的容器存储渲染 watcher 
// let globalWatcher
// 学vue的实现
Dep.target = null // 这是全局的watcher

let targetStack = []
//  将当前操作的 watcher 存储到全局watcher 中，参数 target 就是当前watcher
function pushTarget(target){
  targetStack.unshift(Dep.target) // vue源代码中使用的push
  Dep.target = target
}

// 将当前 watcher 剔除，
function popTarget(target){
  Dep.target = targetStack.shift() // 踢到最后就是 undefined 
}

/**
 * 在 watcher 调用 get 方法时候，调用 pushTarget
 * 在 watcher 的 get 方法调用结束时候，调用 popTarget
 */