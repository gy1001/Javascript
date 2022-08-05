class Snake {
  head: HTMLElement
  snake: HTMLElement
  bodies: HTMLCollection

  constructor() {
    this.snake = document.getElementById('snake') as HTMLElement
    this.head = document.querySelector('#snake>div') as HTMLElement
    this.bodies = this.snake.getElementsByTagName('div') as HTMLCollection
  }

  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  gameOver() {
    throw new Error('蛇撞墙了')
  }

  set X(value) {
    console.log('设置蛇的x的值')
    if (value < 0 || value > 290) {
      this.gameOver()
      return
    }
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }

  set Y(value) {
    console.log('设置蛇的y的值')
    // if (this.Y === value) {
    //   return
    // }
    if (value < 0 || value > 290) {
      this.gameOver()
      return
    }
    this.head.style.top = value + 'px'
    // if (this.bodies.length > 1) {
    // }
  }

  addBodies() {
    const div = document.createElement('div')
    this.snake.insertAdjacentElement('beforeend', div)
  }

  moveBody() {
    for (let index = this.bodies.length - 1; index > 0; index--) {
      const element = this.bodies[index]
      // 获取前面身体的位置
      const hisFirstEl = this.bodies[index - 1]
      let X = (hisFirstEl as HTMLElement).offsetLeft
      let Y = (hisFirstEl as HTMLElement).offsetTop
      // 把这个值设置到当前值身上
      ;(element as HTMLElement).style.left = X + 'px'
      ;(element as HTMLElement).style.top = Y + 'px'
    }
  }

  // 检测头部有没有碰撞到身体
  checkHeadBody() {
    for (let index = this.bodies.length - 1; index > 0; index--) {
      const currentEl = this.bodies[index] as HTMLElement
      if (this.X === currentEl.offsetLeft && this.Y === currentEl.offsetTop) {
        // 蛇头撞到身体了
        throw new Error('蛇头撞到身体了')
      }
    }
  }
}

export default Snake
