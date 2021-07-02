let a :number;  // 声明一个变量a , 同时指定它的类型为 number
a = 10
//a = "hello" 此行代码报错



let e: unknown; // e 为 unkown 类型
e = 10
e = true
e = "hello"

let s:string // s为字符串类型
// s = e // 这里会报错

if(typeof e === "string"){
  s = e // 这样就不会报错
}

function b():void{
  return null
}