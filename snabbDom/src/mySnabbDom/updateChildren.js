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
  // 
  let keyMap
  
  while(oldStartIndex<=oldEndIndex && newStartIndex <= newEndIndex){
    // 如果 旧的开始节点不存在，也就是之前设置了 undefined
    if(oldStartVNode == null){ // 注意 undefined == null  为true
      oldStartVNode = oldChildren[++oldStartIndex]
    }else if(oldEndVNNode == null){
      oldEndVNNode = oldChildren[--oldEndIndex]
    }else if(newStartVNode == null){
      newStartVNode = newChildren[++newStartIndex]
    }else if(newEndVNode == null){
      newEndVNode = newChildren[--newEndIndex]
    }
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
      // 继续看看有没有剩下的
      if(!keyMap){
        keyMap = {}
        for (let index = oldStartIndex; index < oldEndIndex; index++) {
          const key = oldChildren[index].key
          if(key !== undefined){
            keyMap[key] = index
          }
        }
      }
      // 寻找当前这项(newStartIndex)这项在 keyMap 中的映射的位置序号
      const idxInOld = keyMap[newStartVNode.key]
      if(idxInOld == null){
        // 判断，如果 idxInOld 是 undefined 表示他是全新的项目
        parentElm.insertBefore(createElement(newStartVNode), oldStartVNode.elm)
      }else{
        console.log("如果不是 undefined 说明不是全新的项目，需要移动")
        // 如果不是 undefined 说明不是全新的项目，需要移动
        const elmToMove = oldChildren[idxInOld]
        console.log(elmToMove)
        patchVNode(elmToMove, newStartVNode)
        // 把这项设置为 undefined， 表示已经处理完这项
        oldChildren[idxInOld] = undefined
        // 移动，调用 insertBefore 也可以实现移动 
        // 移动到 oldStartIndex 前面
        parentElm.insertBefore(elmToMove.elm, oldStartVNode.elm)
      }
      newStartVNode = newChildren[++newStartIndex]
    }
  }
  // 循环结束时候，新前 小于等于 新后说明这些节点需要新增
  // 在新前前插入 需要新增的节点
  if(newStartIndex <= newEndIndex){
    console.log('新节点需要有新增的')
    for (let index = newStartIndex; index <= newEndIndex; index++) {
      // 插入的标杆
      parentElm.insertBefore(createElement(newChildren[index]), oldStartVNode.elm)
    }
  }else if(oldStartIndex <= oldEndIndex){
    console.log("旧节点需要有删除的")
    // 循环结束时候，旧前 小于等于 旧后说明这些节点需要删除
    for (let index = oldStartIndex; index <= oldEndIndex; index++) {
      // 这里有标记为 undefined 的节点
      oldChildren[index] && parentElm.removeChild(oldChildren[index].elm)
    }
  }
}