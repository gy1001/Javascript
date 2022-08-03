# TypeScript

## TS 简介

### TypeScript 是什么

- 以 JavaScript 为基础构建的语言
- 一个 JavaScript 的超集
- 可以在任何支持 JavaScript 的平台中执行（**TS 不能被 JS 解析器直接执行，需要把 TS 编译为 TS**）
- TypeScript 扩展了 JavaScript，并添加了类型

### TypeScript 增加了什么

- 类型
- 支持 ES 的新特性
- 添加了 ES 不具备的新特性
- 丰富的配置选项
- 强大的开发工具

## 1、TypeScript 的开发环境搭建

### 1.1 下载并安装 Node.js

[官网下载](https://nodejs.org/zh-cn/)

### 1.2 使用 npm 全局安装 TypeScript

- 安装命令

  ```shell
  npm install -g typescript
  ```

- 编译命令

  ```shell
  tsc helloworld.ts
  ```

## 2、TS 的类型声明

### 2.1 类型声明

- 类型声明是 TS 非常重要的一个特点

- 通过类型声明可以指定 TS 中变量 （参数、形参）的类型

- 指定类型后，当为变量赋值时，TS 编译器回自动检查值是否符合类型声明，符合则赋值，否则报错

- 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

- 语法

  ```javascript
  let 变量：类型；
  let 变量：类型 = 值；
  function fn(参数：类型，参数：类型)：类型{
    ...
  }
  ```

- 自动类型判断

  - TS 拥有自动的类型判断机制
  - 当对变量的声明和赋值时同时进行的，TS 编译器会自动判断变量的类型
  - 所以如果你的变量的声明和赋值同时进行，可以省略类型声明

- 类型断言

  - 常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
  - 推荐 as 语法

- 类型

  | 类型    | 例子            | 描述                            |
  | ------- | --------------- | ------------------------------- |
  | number  | 1, -33, 2.5     | 任意数字                        |
  | string  | "hi", 'hi', hi  | 任意字符串                      |
  | boolean | true, false     | 布尔值 true 或者 false          |
  | 字面量  | 其本身          | 限制变量的值就是该字面量的值    |
  | any     | \*              | 任意类型                        |
  | unknown | \*              | 类型安全的 any                  |
  | void    | 空值(undefined) | 没有值(或者 undefined)          |
  | never   | 没有值          | 不能使任何值                    |
  | object  | {name:'孙悟空'} | 任意的 js 对象                  |
  | array   | [1,2,3]         | 任意 JS 数组                    |
  | tuple   | [4, 5]          | 元组，TS 新增类型，固定长度数组 |
  | enum    | enum{A, B}      | 枚举，Ts 新增类型               |

- 例子

  ```javascript
  let a:string = "孙悟空";
  let a = "孙悟空";

  // 类型断言
  let strLength: number = (someValue as string).length;

  // never
  function createError():never{
    throw new Error("报错了")
  }

  // 属性名后面加 ? 表示属性是可选的
  let b:{ name: string, age?: numebr}
  b = { name:'孙悟空', age: 20 }

  let c: {name: string, [propName: string]: any}
  c = { name: '猪八戒', age: 18, gender: "男" }

  // 设置函数结构的类型声明
  let d: (a: number, b: number) => number
  d = function(n1: number, n2: number):number => {
    return n1 + n2
  }

  // 数组
  let e:string[]
  e = ['a','b',"c"]

  let f = Array<number>
  f = [1,2,3,4,5,6,7,8]

  // 元组：固定长度的数组
  let h : [string, number]
  h = ["hello", 123]

  // enum：枚举
  Enum Gnder {
    Male,
    Female
  }
  let i: {name: string, gender: Gender}
  i = { name: '孙悟空', gender: Gender.Male }

  // 联合类型
  let j = string | numebr
  let j: {name:string} & { age: number }
  j = { name: '孙悟空', age: 20 }

  // 类型别名
  let k: 1|2|3|4|5;
  let l: 1|2|3|4|5;
  // 可以简化为如下
  type MyType = 1|2|3|4|5;
  let m: MyType;
  let n: MyType;
  ```
