interface A3 {
  x: number,
  //y: number // 有相同属性但是不同类型，这里是不允许的
  foo(bar:number):number, // 5
  foo(bar:'a'):number, // 2
}
interface A3{
  y: string,
  // 这里实现了一个函数重载的属性，
  // 顺序是
  foo(bar:string):string, // 3
  foo(bar:string[]):string[], // 4
  // 如果有参数为字面量，则优先级最高，所以 首先匹配字面量b 在匹配字面量a 然后其他的依照之前的规则
  foo(bar:'b'):number, // 1
}
let a112:A3= {
  x: 1,
  y: 'hello',
  foo(bar:any){
    return bar
  }
}
// 注意：接口之间的函数属性是可以重复定义的
// 但是命名空间 namespace 之间导出的方法是不可以重复实现的

// 命名空间和函数合并，导出的属性会作为函数的属性
function Lib(){}
namespace Lib{
  export let version = "1.0"
}
console.log(Lib.version) // 1.0

// 命名空间和类的合并
// 相当于给类添加一些静态属性
class C{}
namespace C{
  export let state = 1
}
console.log(C.state)

// 命名空间和枚举的合并
enum Color1{
  Red,
  Yellow,
  Blue
}
namespace Color1{
  export function mix(){}
}
console.log(Color1) // 多添加一个mix属性方法

// 注意： 命名空间必须放在类 函数 的后面，而枚举没有要求