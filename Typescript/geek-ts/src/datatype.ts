import "./enum"
// 原始类型
let bool:boolean= true
let num:number = 123
let str:string="abc"

// 数组
let arr1: number[] = [1,2,3,4]
let arr2: Array<number> = [1,2,3,4]

// 元组
let tuple:[number,string] = [0,'1']
//tuple.push(2)
//console.log(tuple[2])
// 元素中可以使用push方法，但是不能对元组以外的数据进行访问
// 实际应用中不推荐这种用法

// 函数
let add =(x:number,y:number) => x+y
let compute:(x:number,y:number) => number
compute = (a,b) => a + b

// 对象
let obj: {x:number,y:number}= { x:1, y:2 }
obj.x = 3

// symbol
let s1: symbol = Symbol()
let s2: symbol = Symbol()
console.log(s1 === s2) // false

// undefined null
let un:undefined = undefined
let nu: null = null

// 在ts 中 undefined 和 null 是任何类型的子类型，所以可以赋值给为其他类型的变量
// 不过需要在配置文件中 strictNullChecks 设置为 false
let numb: number = undefined

// void
let noReturn  = () => {}

// any
// 不设置类型，默认就是 any
let x

// never 返回错误或者死循环函数
let error = () => {
  throw new Error()
}
let noEnd = () => {
  while(true){}
}


// 枚举的一个例子
