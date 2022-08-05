import Food from './Food'
import Snake from './Snake'
class GameControl {
  food: Food
  snake: Snake

  constructor() {
    console.log('游戏开始初始化')
    this.food = new Food()
    this.snake = new Snake()
    this.init()
  }

  init() {}
}

export default GameControl
