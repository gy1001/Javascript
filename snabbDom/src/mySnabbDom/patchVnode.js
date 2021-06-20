/**
 * 
 */
import createElement from "./createElement";
export default function patchVNode(oldVNode, newVNode){
  // 判断新旧VNode 是不是同一个对象
  if(oldVNode === newVNode){
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
      // 所有oldVNode 中未处理节点的开头
      let un = 0
      for (let index = 0; index < newVNode.children.length; index++) {
        const newNode = newVNode.children[index];
        // 再次遍历，查看 oldVNode.children 中有没有节点和它是same的
        let isNewNodeExistInOldVNode = false // 当前新节点是否存在旧节点子集中
        for (let j = 0; j < oldVNode.children.length; j++) {
          const oldNode = oldVNode.children[j];
          if(oldNode.sel === newNode.sel && oldNode.key === newNode.key){
            isNewNodeExistInOldVNode = true
          }
        }
        if(!isNewNodeExistInOldVNode){
          let newDom = createElement(newNode)
          newNode.elm = newDom
          if(un < oldVNode.children.length){
            oldVNode.elm.insertBefore(newDom, oldVNode.children[un].elm)
          }else{
            oldVNode.elm.appendChild(newDom)
          }
        }else{
          // 让未处理的指针下移
          un++
          // 还需要判断是否节点位置是否发生变化
          if(){
            
          }
        }
      }


    }else{
      // oldVNode 没有children,newVNode 有children
      oldVNode.elm.innerText = ""
      newVNode.children.forEach(item => {
        let domNode = creatElement(item)
        oldVNode.elm.appendChild(domNode)
      })
    }
  }
}