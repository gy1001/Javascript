class Snake {
  head: HTMLElement | null
  snake: HTMLElement | null
  bodies: HTMLCollection | undefined

  constructor() {
    this.snake = document.getElementById('snake')
    this.head = document.querySelector('#snake>div')
    this.bodies = this.snake?.getElementsByTagName('div')
  }

  get X() {
    return this.head?.offsetLeft
  }

  get Y() {
    return this.head?.offsetTop
  }

  gameOver() {
    throw new Error('蛇撞墙了')
  }

  set X(value) {
    console.log('设置蛇的x的值')
  }

  set Y(value) {
    console.log('设置蛇的y的值')
  }
}

export default Snake
