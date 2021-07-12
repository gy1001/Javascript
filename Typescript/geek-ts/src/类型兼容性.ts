// 当一个类型Y 可以被赋值给另一个类型 X 时，我们就可以说类型X兼容类型Y
// X兼容Y:X(目标类型) = Y(源类型)

// 口诀
// 结构之间兼容：成员少的兼容成员多的
// 函数之间兼容：参数多的兼容参数少的


// 类型的兼容性
interface A {
  name: string,
  age : number
}
interface B{
  name: string,
  age: number,
  gender: number
}
// 接口兼容时候，：成员少的兼容成员多的
let x:A = { name:"猪八戒", age: 300 }
let y:B = { name:'孙悟空', age:500, gender: 1}
x = y
y = x// 报错


type HandlerA  = (a:number,b:number) => void
type HandlerB = (a:number,b:number,c:number) => void

function handler(handlerFunc: HandlerA){
  return handlerFunc
} 
// 1) 参数个数
let c1 = (a:number):void => {console.log(a)}
let a1:HandlerA = (a,b) => {console.log(a+b)}
let b1:HandlerB = (a,b,c) =>{console.log(a+b+c)}
// 1: 目标函数类型 HandlerA 为两个参数, 
// 目标函数的参数个数一定要多于源函数的参数个数
handler(a1)
handler(c1)
handler(b1) // 报错：类型“HandlerB”的参数不能赋给类型“HandlerA”的参数。ts(2345)
// 2. 可选参数和剩余参数
let a = (p1:number,p2:number) => {}
let b = (p1?:number, p2?:number) => {}
let c = (...args:number[]) => {}
// 原则1：固定参数是可以兼容可选参数和剩余参数的
a = b
a = c
// 原则2： 可选参数是不兼容 固定参数和可选参数的
b = a // 这里报错   不能将类型“number | undefined”分配给类型“number”。
b = c // 报错  同上, 但是 strictNullChecks 设置为false 或者设置 strictFunctionTypes 为false 后就不会报错 
// 原则3： 剩余参数可以兼容 固定参数和可选参数
c = a
c = b
// 2）参数类型
let handler3 = (a:string) => {}
handler(handler3)  // 因为类型不同

// 这里和最开头的接口兼容结论相反
// 可以理解为 pad 中有两个参数，pbd有三个参数，
// 根据函数参数结论：参数多的兼容参数少的，就对应了
let pad = (point:A) => {}
let pbd = (point:B) => {}
pad = pbd // pad有两个参数，不兼容 pbd三个参数的
pbd = pad

// 3)返回值类型
let f1 = () =>({name:'Alice'})
let g1 = () => ({name:'Alice',location:'Beijing'})
f1 = g1
g1 = f1 // 成员多的兼容成员少的


// 函数重载
function overload(a:number,b:number):number
function overload(a:string,b:string):string
// 具体的实现为源函数
// 上面的定义为目标函数
// 目标函数 参数应该多余源函数,可实现兼容
function overload(a:any,b:any,c:number):any{
  // 这里是具体实现
}

// 枚举类型兼容性
enum Fruit{
  Apple,
  Banana
}
enum Color {
  Red,
  Yellow
}
// 枚举类型和数值类型是完全可以互相兼容的
let fruit:Fruit.Apple = 3
let no:number = Fruit.Apple
fruit = no
no = fruit
// 枚举之间是完全不兼容的
let color:Color.Red = Fruit.Apple

// 类兼容性
// 和接口类似，之比较结构
// 静态成员和构造函数是不参与比较的
//  如果两个类具有相同的实例成员，那么他们的实例就能相互兼容

// 如果两个类中有私有成员，就只有父类和子类进行兼容
class A1{
  constructor(p:number,q:number){}
  id:number = 1
  private age = 1 
}
class B1{
  static s = 1
  constructor(p:number){}
  id:number = 2
  // gender: number = 1
  //private age = 2
}
let aa = new A1(1,2)
let bb = new B1(1)
// 因为都有实例成员 id
aa = bb 
bb = aa

class A2 extends A1 {}
// 父类和子类就可以互相兼容
let cc = new A2(1,2)
cc = aa
aa = cc

// 泛型兼容性
interface Empty<T>{
}
let obj1:Empty<number> = {}
let obj2:Empty<string> = {}
obj1 = obj2
obj2 = obj1

// 当泛型类型被接口成员使用时候，会影响兼容性
interface Empty1<T>{
  value: T
}
let obj3:Empty1<number> = {value : 1}
let obj4:Empty1<string> = { value: "hello"}
obj3 = obj4
obj4 = obj3

// 泛型函数
// 如果两个泛型函数定义形同，没有指定类型参数，那么也是可以兼容
let log12 = <T>(x:T):T => {
  console.log("x")
  return x
}
let log34 = <U>(y:U):U => {
  console.log('y')
  return y
}
log12 = log34
log34 = log12
