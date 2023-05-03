type Point = { x: number; y: number }
function tsGetDistance(point1: Point, point2: Point) {
  return [point2.x - point1.x, point2.y - point1.y]
}

tsGetDistance({ x: 1, y: 1 }, { x: 2, y: 2 })

tsGetDistance({ x: 1 }, { x: 2, y: 2 })

tsGetDistance({ x: 1, y: 1 }, { y: 2 })

tsGetDistance({ x: '21', y: 1 }, { y: 2 })

// 类型收窄
function uppercase(content: string | number) {
  if (typeof content === 'string') {
    return content.toUpperCase()
  }
  return content
}

// 真值收窄
function getStringTest(content?: string) {
  if (content) {
    return content.toUpperCase()
  }
}

// 相等收窄
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    return x.toUpperCase()
  }
}

function getObjectValue({ a, b }: { a: number; b: number }) {
  return a + b
}

getObjectValue({ a: 1, b: 2 })

let userName: string | number = '123'
userName = 123

type Fish = {
  swim: () => {}
}
type Bird = {
  fly: () => {}
}
function test(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim()
  }
  return animal.fly()
}

function test1(params: Date | string) {
  if (params instanceof Date) {
    return params.getTime()
  }
  return params.toUpperCase()
}

function isFish(animal: Fish | Bird): animal is Fish {
  if ((animal as Fish).swim) {
    return true
  }
  return false
}
function test2(animal: Fish | Bird) {
  if (isFish(animal)) {
    return animal.swim()
  }
  return animal.fly()
}

// 有属性的函数类型定义方法
interface FunctionWithAttributes {
  attr: string
  (str: string): void
}

const test3: FunctionWithAttributes = (str: string) => {
  console.log(str)
}
test3.attr = 'attributes'

// 构造函数的类型如何定义
interface ClassWithConstructor {
  new (str: string): void
}

function testOne(outerClass: ClassWithConstructor) {
  const instance = new outerClass('new')
}

class TestOne {
  name: string
  constructor(str: string) {
    this.name = str
  }
}

testOne(TestOne)

interface DateType {
  new (): Date
  (dateString: string): string
}

// 函数和泛型
function getArrayFirstItem<Type>(arr: Type[]) {
  return arr[0]
}

const numberArr = [1, 2, 3, 4]
const resultOne = getArrayFirstItem(numberArr)

const stringArr = ['1', '2', '3', '4']
const stringOne = getArrayFirstItem(numberArr)

// 函数重载
function getString(str: string): string
function getString(str: string, str1: string): number
function getString(str: string, str1?: string) {
  if (typeof str1 === 'string') {
    return (str + str1).length
  }
  return str
}

// 重命名
function showPerson({
  name: nick = '孙悟空',
  age: old = 20,
}: {
  name: string
  age: number
}) {
  console.log(nick)
  console.log(old)
}

// interface 中的 readonly 属性
interface Person {
  readonly name: string
  age: number
}
const dell: Person = { name: '孙悟空', age: 30 }
dell.name = '猪八戒' // 这里就会报错：Cannot assign to 'name' because it is a read-only property.

interface ArrayOrObject {
  length: number
  [key: string]: string | number
}
const obj: ArrayOrObject = {
  length: 0,
  a: '123',
  b: 123,
}

interface Animal {
  name: string
  age: number
  breath: () => void
}

const animal: Animal = {
  name: 'panda',
  age: 1,
  breath: () => {},
}

interface Dog extends Animal {
  bark: () => void
}
const dog: Dog = {
  name: 'wangcai',
  age: 1,
  breath: () => {},
  bark: () => {},
}

interface Circle {
  radius: number
}

interface Colorful {
  color: string
}

interface ColorfuleCircle extends Circle, Colorful {}

const colorfuleCircle: ColorfuleCircle = {
  radius: 1,
  color: 'red',
}

type ColorfuleCircleOne = Circle & Colorful

const colorfuleCircleOne: ColorfuleCircleOne = {
  radius: 3,
  color: 'blue',
}

// type Cat = { name: string; purrs: boolean }
// type Dog1 = { name: string; barks: boolean; wags: boolean }
// type CatOrDogOrBoth = Cat | Dog1
// type CatAndDog = Cat & Dog1

// //Cat
// let a: CatOrDogOrBoth = {
//   name: 'Bonkers',
//   purrs: true,
// }

// //Dog
// a = {
//   name: 'sljdfls',
//   barks: true,
//   wags: false,
// }

// //猫狗
// a = {
//   name: 'catdog',
//   purrs: true,
//   barks: true,
//   wags: false,
// }

// interface A {
//   name: string
//   age: number
// }

// interface B {
//   name: number
//   id: string
// }

// type Union = A | B
// const c: Union = {
//   name: 1111,
//   // age: 2222,
//   id: '11111',
// }
interface Box<Type> {
  content: Type
}

const box: Box<string> = { content: 'box' }
const box1: Box<number> = { content: 100 }
const box2: Box<boolean> = { content: true }

type orNull<Type> = Type | null
const test4: orNull<string> = '111'
const test5: orNull<string> = null

type oneOrMany<T> = T | T[]
const test6: oneOrMany<string> = ['123']
const test7: oneOrMany<string> = '123'
