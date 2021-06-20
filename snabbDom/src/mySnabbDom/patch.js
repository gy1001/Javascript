import creatElement from "./createElement";
import vNode from "./vnode";
import patchVNode from './patchVnode'

export default function (oldVNode, newVNode){
  // 判断传入的第一个参数，是Dom节点还是虚拟节点
  if(oldVNode.sel == "" || oldVNode.sel == undefined){
    // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
    oldVNode = vNode(oldVNode.tagName.toLowerCase(), {}, [], undefined, oldVNode)
  }
  // 判断oldVNode 和newVnode 是不是同一个节点
  if(newVNode.key === oldVNode.key && oldVNode.sel === newVNode.sel){
    patchVNode(oldVNode, newVNode)
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

// 1. patch 函数被调用
// 2. oldVNode 是虚拟节点还是Dom节点
// 3.   如果是虚拟节点，                如果是Dom节点，就将 oldVNode 包装为虚拟节点，然后下一步
// 4. 然后判断 oldVNode 和 newVNode 是不是同一个节点 (sel和key都相同)  
// 5.  如果是就下一步                  如果不是的话，就进行暴力删除旧的，插入新的，结束
// 6. 在判断oldVNode 和 newVNode 是不是内存中同一个对象   
// 7. 如果不是就下一步                   如果是就什么也不用做，结束
// 8. 判断 newVNode有没有文字text属性
// 9. 如果没有(意味着有children)，进入下一步                如果有的话，进行判断处理
//                                   判断newVNode 中的text 属性和 oldVNode 中的text属性是否相同
//                                   如果相等，什么就不做，结束                     
//                                   如果不相等，就需要把 elm 中的 innerText 改变为 newVNode 中的 text,结束(注意：如果oldVNode中的有children属性没有text属性，一旦更改innerText，老节点的children属性会被删除)
// 10. 判断 oldValue 中有没有 children
// 11. 如果有，                       如果没有(意味着oldVNode中有text)，需要做1：清空oldVNode中的text,然后2：把 newVNode 中的 children 属性 添加到 DOM 中
// 12. 这里意味着 newVNode oldVNode 都有 children 属性, 此处要进行最优雅的 diff 算法