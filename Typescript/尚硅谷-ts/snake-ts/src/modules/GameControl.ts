import Food from './Food'
import Snake from './Snake'
class GameControl {
  food: Food
  snake: Snake
  // 用来存储蛇运动的方向
  direction: string = 'ArrowDown'
  // 游戏是否结束
  isLive: boolean = true
  constructor() {
    console.log('游戏开始初始化')
    this.food = new Food()
    this.snake = new Snake()
    this.init()
  }

  init() {
    // 绑定事件
    document.addEventListener('keydown', this.keyDownHandler.bind(this))
    this.run()
  }

  keyDownHandler(event: KeyboardEvent) {
    this.direction = event.key
  }

  run() {
    let x = this.snake.X
    let y = this.snake.Y
    switch (this.direction) {
      case 'ArrowDown':
      case 'Down':
        y += 10
        break
      case 'ArrowLeft':
      case 'Left':
        x -= 10
        break
      case 'ArrowRight':
      case 'Right':
        x += 10
        break
      case 'ArrowUp':
      case 'Up':
        y -= 10
        break
      default:
        break
    }
    this.checkEat(x, y)
    try {
      this.snake.X = x
      this.snake.Y = y
    } catch (error) {
      console.log(error)
      this.isLive = false
    }

    // 开启一个定时调用
    if (this.isLive) {
      setTimeout(() => {
        this.run()
      }, 300)
    }
  }

  checkEat(x: number, y: number) {
    if (x === this.food.X && y === this.food.Y) {
      console.log('吃到食物了')
      // 食物的位置改变
      this.food.change()
      // 分数 +1
      // 蛇的 body 加1
      this.snake.addBodies()
    }
  }
}

export default GameControl
