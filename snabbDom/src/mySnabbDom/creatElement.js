// 真正创建节点，将 vNode,是孤儿节点不进行插入
export default function createElement(vNode){
  console.log(22222, vNode)
  let domNode = document.createElement(vNode.sel)
  // 有子节点还是有文本？
  if (vNode.text !== '' && (vNode.children == undefined || vNode.children.length === 0 )){
    // 它内部是文字
    domNode.innerText = vNode.text
  }else if(Array.isArray(vNode.children) && vNode.children.length > 0){
    // 它内部是子节点，需要进行递归
    for (let index = 0; index < vNode.children.length; index++) {
      // 得到当前这个 children
      const element = vNode.children[index];
      // 创建它的dom, 一旦调用createElement 意味着，创建出dom了，并且它的elm属性指向了
      // 创建出的dom,但是还没有上树，是一个孤儿节点
      let elementDom = createElement(element)
      domNode.appendChild(elementDom)
    }
  }
  // 补充elm属性
  vNode.elm = domNode
  // 返回 elm
  return vNode.elm
}