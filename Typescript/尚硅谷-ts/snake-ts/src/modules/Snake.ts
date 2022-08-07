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
    if (this.X === value) {
      return
    }
    if (value < 0 || value > 290) {
      this.gameOver()
      return
    }
    // 如果将要设置的位置与蛇身第二节的左边距离相同，说明蛇要进行掉头了
    if (
      this.bodies.length > 1 &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      console.log('说明蛇要左右进行掉头了')
      if (value > this.X) {
        // 说明方向是向右进行调头,不应该调头，应该设置当前X位置左边10的距离位置
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }

  set Y(value) {
    console.log('设置蛇的y的值', this.Y, value)
    if (this.Y === value) {
      return
    }
    if (value < 0 || value > 290) {
      this.gameOver()
      return
    }
    if (
      this.bodies.length > 1 &&
      (this.bodies[1] as HTMLElement).offsetTop === value
    ) {
      if (value > this.Y) {
        // 说明方向是向上进行调头，
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadBody()
  }

  addBodies() {
    const div = document.createElement('div')
    this.snake.insertAdjacentElement('beforeend', div)
  }

  // 移动身体，应该从后往前遍历，否则前面的移动后，后一个就无法匹配前面的那个位置
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
