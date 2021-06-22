import Observer from "./observer"
export const observe = function(value){
  // 创建 observer 函数，注意函数的名字没有r
  if(typeof value !== 'object'){
    return 
  }
  // 定义ob
  var ob
  if(typeof value.__ob__ !== "undefined"){
    ob = value.__ob__
  }else{
    ob = new Observer(value)
  }
  return ob
}
