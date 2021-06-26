var uid = 0
export default class Dep{
  constructor(){
    this.id = uid++
    console.log('i am Dep Class')
    // 用数组来存储自己的订阅者，subs 是订阅者 subscribes 的缩写 
    // 存储的是 watcher 实例
    this.subs = []
  }   

  // 添加订阅
  addSub(sub){
    this.subs.push(sub)
  }

  // 添加依赖
  depend(){
    // Dep.target 就是一个我们自己指定的全局的一个属性，你用window.target也行，是要是全局唯一，没有歧义就行
    if(Dep.target){
      this.addSub(Dep.target)
    }
  }

  // 移除订阅


  // 通知更新
  notify(){
    console.log("notify")
    const subs = this.subs.slice()
    subs.forEach(sub => {
      sub.update()
    })
  }

}