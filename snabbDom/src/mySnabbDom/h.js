import vNode from '../vnode'

// 形态1： h("div", {} ,"文字")
// 形态2：h("div", {} , [])
// 形态3：h("div", {} , h())

// 低配版h ,调用时候必须是三个参数，缺一不可, 形态类似上述三种
export default function h(sel,data,c){
  // 检查参数个数
  if(arguments.length !== 3){
    throw new Error('参数必须是三个')
  }
  // 检查c 的类型    
  if(typeof c === "string" || typeof c === "number"){
    //  形态1
    return vNode(sel, data, undefined,c,undefined)
  }else if(Array.isArray(c)){
    // 形态2
    let children = []
    for (let index = 0; index < c.length; index++) {
      const element = c[index]; // 这里又重新调用了h函数，返回结果
      // element 必须是一个对象
      if(typeof element !=="object" && element.hasOwnProperty('sel')){
        throw new Error("传入的数组参数中有某项不是h函数")
      }
      children.push(element)
    }
    return vNode(sel, data,children,undefined,undefined)
  }else if(typeof c === "object" && c.hasOwnProperty('sel')){
    // 形态3
    // 说明传入的是唯一的children, 不用执行c,
    let children = c
    return vNode(sel, data,children,undefined,undefined)
  }else {
    throw new Error("参数格式错误")
  }
}