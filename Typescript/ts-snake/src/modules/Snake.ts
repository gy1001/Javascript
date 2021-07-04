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

  // 修改x时候，蛇是在进行水平方向左右移动，假如蛇向左移动时候就不能向右移动,反之亦然
  set X(value:number){
    if(this.X === value){
      return 
    }
    if(value < 0 || value > 290){
      this.gameOver()
      return 
    }
    // 如果蛇头的位置和第二节的位置一样，说明蛇发生了调头
    if(this.bodies.length > 1 && (this.bodies[1] as HTMLElement).offsetLeft === value){
      console.log("蛇调头了")
      // 如果发生了调头，就让蛇向反方向继续移动
      if(value > this.X){
        // 此时发生向右调头，所以应该不调头，继续向左走
        value = this.X - 10
      }else{
        value = this.X + 10
      }
    }
    this.moveBody()
    this.head.style.left = value +"px"
    this.checkHeadBody()
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
    // 如果蛇头的位置和第二节的位置一样，说明蛇发生了调头
    if(this.bodies.length > 1 && (this.bodies[1] as HTMLElement).offsetTop === value){
      console.log("蛇调头了")
      // 如果发生了调头，就让蛇向反方向继续移动
      if(value > this.Y){
        // 此时发生向下调头，所以应该不调头，继续向上走
        value = this.Y - 10
      }else{
        value = this.Y + 10
      }
    }
    
    this.moveBody()
    this.head.style.top = value +"px"
    // 检测有没有撞到自己
    this.checkHeadBody()
  }

  // 蛇增加一节的方法
  addBodies(){
    const div = document.createElement("div")
    this.snake.insertAdjacentElement("beforeend", div)
  }

  // 身体移动
  moveBody(){
    // 将后面身体的位置设置为前面身体的位置
    for (let index = this.bodies.length-1; index > 0; index--) {
      const element = this.bodies[index];
      // 获取前面身体的位置
      const hisFirstEl = this.bodies[index-1]
      let X = (hisFirstEl as HTMLElement).offsetLeft;
      let Y = (hisFirstEl as HTMLElement).offsetTop;
      // 当他的值设置为当前值身上
      (element as HTMLElement).style.left = X + 'px';
      (element as HTMLElement).style.top = Y + "px";
    }
  }

  // 检查头和身体有没有相撞
  checkHeadBody(){
    for (let index = this.bodies.length-1; index > 0; index--) {
      const currentEl = this.bodies[index] as HTMLElement
      if(this.X === currentEl.offsetLeft && this.Y === currentEl.offsetTop){
        // 蛇头撞到身体了
        throw new Error("蛇头撞到自己了")
      }
    }
  } 

}

export default Snake