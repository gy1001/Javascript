// 引入其他的类
import Food from "./Food"
import Snake from "./Snake"
import ScorePanel from "./ScorePanel"
class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  // 用来存储蛇运行的方向
  direction: string = 'Right'
  // 游戏是否结束
  isLive:boolean = true

  constructor(){
    this.food = new Food()
    this.snake = new Snake()
    this.scorePanel = new ScorePanel()
    this.init()
    this.run()
  }

  init(){
    // 绑定事件
    document.addEventListener("keydown", this.keyDownHandler.bind(this))
  }

  // 
  keyDownHandler(event: KeyboardEvent){
    console.log(event.key)
    this.direction = event.key
    this.run()
  }

  run(){
    let x = this.snake.X
    let y = this.snake.Y
    // 向上 top--
    // 向下 top++
    // 向左 left --
    // 向右 left ++  
    switch(this.direction){
      case 'ArrowDown':
      case 'Down':
        y+=10
        break
      case 'ArrowLeft':
      case 'Left':
        x-=10
        break
      case 'ArrowRight':
      case 'Right':
        x+=10
        break
      case 'ArrowUp':
      case 'Up':
        y-=10
        break
    }
    this.snake.X= x 
    this.snake.Y= y
    // 开启一个定时调用
    if(this.isLive){
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level-1) * 30);
    }
  }

}
export default GameControl