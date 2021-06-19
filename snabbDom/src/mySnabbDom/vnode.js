/**
 * 
 */

// 函数的功能：把参数变为对象

export default function vNode(sel, data, children, text, elm){
  return {
    sel, data, children, text, elm
  }
}