/**
 * 
 */
import createElement from "./createElement";
import updateChildren from "./updateChildren";
// 对比同一个虚拟节点
export default function patchVNode(oldVNode, newVNode){
  // 判断新旧VNode 是不是同一个对象
  if(oldVNode === newVNode){
    console.log("是同一个对象")
    return 
  }
  // 判断 newVNNode 里面有没有 text属性
  if(newVNode.text !== undefined &&(newVNode.children === undefined || newVNode.children.length == 0)){
    // newVNode 有text属性
    if(newVNode.text !== oldVNode.text ){
      oldVNode.elm.innerText = newVNode.text
    }
  }else {
    // newVNode 没有 text 属性,即有children 属性
    // 判断 oldVNode 有没有 children
    if(oldVNode.children !== undefined && oldVNode.children.length >0){
      // 老的有children 此时就是最复杂的情况，就是 newVNode, oldVNode 都有children
      updateChildren(oldVNode.elm, oldVNode.children, newVNode.children)
    }else{
      // oldVNode 没有children,newVNode 有children
      oldVNode.elm.innerText = ""
      newVNode.children.forEach(item => {
        let domNode = createElement(item)
        oldVNode.elm.appendChild(domNode)
      })
    }
  }
}