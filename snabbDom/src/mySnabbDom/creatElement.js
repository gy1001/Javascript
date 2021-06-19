// 真正创建节点，将 vNode  
export default function(vNode, pivot){
  // 目的是： 把虚拟节点 vnode 插入到 pivot 前
  let domNode = document.createElement(vNode.sel)
  // 有子节点还是有文本？
  if (vNode.text !== '' && (vNode.children == undefined || vNode.children.length === 0 )){
    // 它内部是文字
    domNode.innerText = vNode.text
    // 将孤儿节点上树
    // 让标杆节点的父元素调用 insertBefore 方法，将新的孤儿节点插入到标签节点之前
    pivot.parentNode.insertBefore(domNode,pivot)
  }else if(Array.isArray(vNode.children) && vNode.children.length > 0){
    
  }
}