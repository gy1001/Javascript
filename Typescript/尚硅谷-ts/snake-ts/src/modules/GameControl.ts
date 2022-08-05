import Food from './Food'

class GameControl {
  food: Food

  constructor() {
    console.log('游戏开始初始化')
    this.food = new Food()
    this.init()
  }

  init() {}
}

export default GameControl
