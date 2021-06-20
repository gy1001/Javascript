import createElement from "./createElement"
import patchVNode from "./patchVnode"

// 判断是否是同一个节点
export function checkSameNode(a,b){
  return a.sel === b.sel && a.key === b.key
}

export default function updateChildren(parentElm, oldChildren, newChildren){
  // 旧前
  let oldStartIndex = 0
  // 新前
  let newStartIndex = 0
  // 旧后
  let oldEndIndex = oldChildren.length - 1
  // 新后
  let newEndIndex = newChildren.length - 1

  // 旧前节点
  let oldStartVNode = oldChildren[0]
  // 旧后节点
  let oldEndVNNode = oldChildren[oldEndIndex]
  // 新前节点
  let newStartVNode = newChildren[0]
  // 新后节点
  let newEndVNode = newChildren[newEndIndex]
  
  while(oldStartIndex<=oldEndIndex && newStartIndex <= newEndIndex){
    if(checkSameNode(newStartVNode, oldStartVNode)){
      // 新前与旧前是同一个节点
      console.log("①新前与旧前相同")
      patchVNode(oldStartVNode, newStartVNode)
      oldStartVNode = oldChildren[++oldStartIndex]
      newStartVNode = newChildren[++newStartIndex]
    }else if(checkSameNode(newEndVNode, oldEndVNNode)){
      // 新后与旧后进行比较，是同一个节点
      console.log("②新后与旧后相同")
      patchVNode(oldEndVNNode, newEndVNode)
      oldEndVNNode = oldChildren[--oldEndIndex]
      newEndVNode = newChildren[--newEndIndex]
    }else if(checkSameNode(newEndVNode, oldStartVNode)){
      // 新后与旧前是同一个节点
      console.log("③新后与旧前相同")
      patchVNode(oldStartVNode, newEndVNode)
      // 当新后与旧前命中的时候，此时需要移动节点，移动 新前 指向的这个节点到老节点的旧后的后面
      parentElm.insertBefore(oldStartVNode.elm, oldEndVNNode.elm.nextSibling)
      oldStartVNode = oldChildren[++oldStartIndex]
      newEndVNode = newChildren[--newEndIndex]
    }else if(checkSameNode(newStartVNode, oldEndVNNode)){
      // 新前与旧后是同一个节点
      console.log("④新前与旧后相同")
      // 此时要移动节点，移动新前节点到老节点的旧前的前面
      patchVNode(oldEndVNNode, newStartVNode)
      parentElm.insertBefore(oldEndVNNode.elm, oldStartVNode.elm)
      oldEndVNNode = oldChildren[--oldEndIndex]
      newStartVNode = newChildren[++newStartIndex]
    }else {
      console.log("都没有命中")
    }

    
  }
}