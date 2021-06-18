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
      //resultStr += renderTemplate(element[2], data[element[1]])
    }
  }
  return resultStr
}