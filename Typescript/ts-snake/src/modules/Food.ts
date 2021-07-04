// 定义食物类
class Food{
  // 定义一个属性表示食物所对应的元素
  element: HTMLElement
  constructor(){
    this.element = document.getElementById("food")!
  }

  // 定义一个额获取食物x轴的坐标
  get X(){
    return this.element.offsetLeft
  }
  // 定义一个获取食物Y的坐标
  get Y(){
    return this.element.offsetTop
  }

  // 修改位置的方法, 位置随机
  change(){
    // 最小是0 最大是290（304-10-4）
    // 蛇每一次移动是 10，所以食物的坐标必须是 10 的倍数
    let top = Math.round(Math.random()*29) * 10
    let left = Math.round(Math.random()*29) * 10
    this.element.style.left = left +"px"
    this.element.style.top = top +"px"
  }

} 
export default Food