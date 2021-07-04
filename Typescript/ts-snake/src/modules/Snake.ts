class Snake{
  // 蛇头的信息
  head: HTMLElement
  snake: HTMLElement
  // 蛇身，包括蛇头
  bodies: HTMLCollection

  constructor(){
    this.snake = document.getElementById("snake")!
    this.head = document.querySelector("#snake > div")!
    this.bodies = this.snake.getElementsByTagName("div")!
  }

  // 获取蛇的坐标（蛇头的坐标）
  get X(){
    return this.head.offsetLeft
  }

  get Y(){
    return this.head.offsetTop
  }

  set X(value:number){
    if(this.X === value){
      return 
    }
    if(value < 0 || value > 290){
      this.gameOver()
      return 
    }
    this.head.style.left = value +"px"
  }

  gameOver(){
    throw new Error("蛇撞墙了")
  }

  set Y(value:number){
    if(this.Y === value){
      return
    }
    if(value < 0 || value > 290){
      this.gameOver()
      return 
    }
    this.head.style.top = value +"px"
  }

  // 蛇增加一节的方法
  addBodies(){
    const div = document.createElement("div")
    this.snake.insertAdjacentElement("beforeend", div)
  }

}

export default Snake