/**
 * 功能是可以在 dataObj 对象中，寻找用连续点符号的 keyName 属性
 * 比如 dataObj是 {a:{b:{c:100}}}
 * 那么 lookUp(dataObj, 'a.b.c') 结果就是100
 */

export default function lookUp(dataObj, keyName){
  if(keyName.indexOf('.') !==-1){
    var temp = dataObj
    var keys = keyName.split('.')
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      temp = temp[keys[index]]
    }
    return temp
  }
  return dataObj[keyName]
} 