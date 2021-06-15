class VNode{
  constructor(tag, data, value, type){
    this.tag = tag && tag.toLowerCase()
    this.data = data
    this.value = value
    this.type = type
    this.childNodes = []
  }
  addNode(node){
    this.childNodes.push(node)
  }
}