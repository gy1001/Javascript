/**
 *  函数的功能是让 tokens 数组 变为 dom 字符串
 */
import lookUp from "./lookUp"

export default function renderTemplate(tokens, data){
  var resultStr = ""
  for (let index = 0; index < tokens.length; index++) {
    const element = tokens[index];
    if(element[0] === "text"){
      resultStr +=element[1]
    }else if(element[0] === "name"){
      resultStr += lookUp(data, element[1])
    }else if(element[0] === "#"){
      resultStr += parseArray(element[2], data[element[1]])
    }
  }
  return resultStr
}


/**
 * 处理数组，结合 renderTemplate 实现递归
 * 注意，这里函数接受的参数是token, 而不是tokens 
 * token 就是类似于  一个简单的 ['#',"students", []]
 * @param {*} token 
 * @param {*} array 
 */
function parseArray(token, array){
  var resultStr = ""
  array.forEach(item => {
    // 这里兼容 . 属性，否则会报错
    resultStr += renderTemplate(token, {
      ...item,
      '.': item
    })
  })
  return resultStr
}