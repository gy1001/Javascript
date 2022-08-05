// 定义一个食品类
class Foo {
  element: HTMLElement | null
  constructor() {
    this.element = document.getElementById('food')
  }

  getX() {
    return this.element?.offsetLeft
  }

  getY() {
    return this.element?.offsetTop
  }

  // 修改位置的方法,位置随机
  change() {
    // 最小是0 ，最大是 290（304-10-
    let top = Math.round(Math.random() * 29) * 10
    let left = Math.round(Math.random() * 29) * 10
    if (this.element) {
      this.element.style.left = left + 'px'
      this.element.style.top = top + 'px'
    }
  }
}

export default Foo
