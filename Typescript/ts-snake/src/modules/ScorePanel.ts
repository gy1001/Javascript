class ScorePanel{
  score: number = 0
  level: number = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement
  maxLevel: number
  constructor(maxLevel: number = 10){
    this.maxLevel = maxLevel
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
  }

  // 加分犯法
  addScore(){
    this.scoreEle.innerHTML = ++this.score + ""
    if(this.score % 10 === 0){
      this.levelUp()
    }
  }

  levelUp(){
    if(this.level < this.maxLevel){
      this.levelEle.innerHTML = ++this.level + ""
    }
  }

}

export default ScorePanel