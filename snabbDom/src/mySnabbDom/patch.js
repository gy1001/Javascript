import creatElement from "./creatElement";
import vNode from "./vnode";

export default function (oldVNode, newVNode){
  // 判断传入的第一个参数，是Dom节点还是虚拟节点
  if(oldVNode.sel == "" || oldVNode.sel == undefined){
    // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
    oldVNode = vNode(oldVNode.tagName.toLowerCase(), {}, [], undefined, oldVNode)
  }
  // 判断oldVNode 和newVnode 是不是同一个节点
  if(newVNode.key === oldVNode.key && oldVNode.sel === newVNode.sel){
    console.log("是同一个节点")
  }else{
    // 不是同一个节点，需要 暴力插入新的，删除旧的
    // 在这里进行页面插入到老节点之前
    let newVNodeElm = creatElement(newVNode)
    if(oldVNode.elm.parentNode && newVNodeElm){
      oldVNode.elm.parentNode.insertBefore(newVNodeElm, oldVNode.elm)
      // 删除老节点
      oldVNode.elm.parentNode.removeChild(oldVNode.elm)
    }
  }
}