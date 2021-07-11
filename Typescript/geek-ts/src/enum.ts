// 数字枚举(可以做反向映射，也可以指定下标索引)
enum Role{
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest
}

console.log(Role.Reporter) // 1
console.log(Role.Developer) // 2
console.log(Role)
console.log(Role[1]) // Reporter

// 字符串枚举（没有反向映射）
enum Message {
  Success = "恭喜您，成功了",
  Fail = "失败了"
}
console.log(Message.Success) // 恭喜您，成功了

// 异构枚举 (数字枚举和字符串枚举混合，容易引起混淆，不建议使用)
enum Answer{
  N,
  Y = "Yes"
}

// 枚举成员
enum Char {
  // const 
  a, // 没有声明的成员类型
  b=Char.a, // 对已有成员类型的引用
  c = 1+3, // 常量表达式
  // computed 需要被计算的枚举成员且非常量表达式
  d = Math.random(),
  e = "123".length,
  // computed 枚举成员的后面必须要赋值一个枚举值否则会报错
  f = 4
}

// 常量枚举 (在编译阶段会被移除，即编译后没有任何代码)
const enum Month{
  Jan,
  Feb,
  Mar
} 

// 用途之一
let month = [Month.Jan,Month.Feb,Month.Mar]

// 枚举类型
enum E {a,b}
enum F {a=0,b=1}
enum G { a = "apple", b="banana" }

let e:E = 3
let f:F = 3
//console.log(e === f) // 报错，不能进行比较，比较了就是返回false

let e1:E.a
let e2:E.b
let e3:E.a
console.log(e1 === e3) // true
