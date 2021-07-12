enum Type{Strong, Week}

class Java{
  helloJava(){
    console.log("java")
  }
}
class JavaScript{
  helloJavaScript(){
    console.log("javascript")
  }
}
//function getLanguage(type:Type){
//  // 这样每一处都要加上类型断言，太麻烦了
//  // 类型保护机制就是为了解决这个问题的
//  let lang = type === Type.Strong ? new Java() : new JavaScript()
//  if((lang as Java).helloJava){
//    (lang as Java).helloJava()
//  }else{
//    (lang as JavaScript).helloJavaScript()
//  }
//  return lang
//} 

// 四种创建类型保护的方法
// 1. instanceof
//function getLanguage(type:Type){
//  let lang = type === Type.Strong ? new Java() : new JavaScript()
//  if(lang instanceof Java){
//    lang.helloJava()
//  }else{
//    lang.helloJavaScript()
//  }
//  return lang
//}
//2. in
//function getLanguage(type:Type){
//  let lang = type === Type.Strong ? new Java() : new JavaScript()
//  if('helloJava' in lang){
//    lang.helloJava()
//  }else{
//    lang.helloJavaScript()
//  }
//  return lang
//}
// 3. typeOf
//function getLanguage(type:Type, x:string|number){
//  let lang = type === Type.Strong ? new Java() : new JavaScript()
//  if(typeof x === "string"){
//    console.log(x.length)
//  }else{
//    console.log(x.toFixed(2))
//  }
//  return lang
//}

// 4: 创建类型保护函数
function isJava(lang:Java|JavaScript): lang is Java{
  return (lang as Java).helloJava !== undefined
}

function getLanguage(type:Type){
  let lang = type === Type.Strong ? new Java() : new JavaScript()
  if(isJava(lang)){
    lang.helloJava()
  }else{
    lang.helloJavaScript()
  }
  return lang
}

getLanguage(Type.Strong, 1)


window.onkeydown = (event) => {
  // (parameter) event: KeyboardEvent
}