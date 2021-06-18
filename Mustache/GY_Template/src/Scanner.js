
export default class Scanner {
  constructor(templateStr){
    // 指针
    this.pos = 0
    // 尾巴，一开始就是模板字符串原文
    this.tail = templateStr
    this.templateStr = templateStr
  }

  scan(tag){
    if(this.tail.indexOf(tag) == 0){
      // tag 有多长，比如{{长度是2 就让指针后移动几位
      this.pos += tag.length
      this.tail = this.templateStr.substr(this.pos)
    }
  }

  // 让指针进行扫描 直到遇到指定内容结束，并且能够返回结束之前路过的文字
  scanUtil(stopTag){
    // 记录一下当前执行方法的时候的pos的值
    const POS_BACKUP = this.pos
    while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
      this.pos++
      // 改变尾巴,从当前指针这个字符开始到最后的全部字符
      this.tail = this.templateStr.substr(this.pos)
    }
    return this.templateStr.substring(POS_BACKUP, this.pos)
  }

  // 指针是否到头，返回布尔值
  eos(){
    return this.pos >= this.templateStr.length
  }
}