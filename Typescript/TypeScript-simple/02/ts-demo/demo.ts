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

type OrNull<Type> = Type | null
const test4: OrNull<string> = '111'
const test5: OrNull<string> = null

type OneOrMany<T> = T | T[]
const test6: OneOrMany<string> = ['123']
const test7: OneOrMany<string> = '123'

type OneOrManyOrNull<T> = OrNull<OneOrMany<T>>
const test8: OneOrManyOrNull<string> = null
const test9: OneOrManyOrNull<string> = '123'
const test10: OneOrManyOrNull<string> = ['123']

// 数组和泛型
interface SelfArray<T> {
  [key: number]: T
  length: number
  pop(): T | undefined
  push(...items: T[]): number
}
const NumberArr: Array<number> = [1, 2, 3, 4]
const test11: SelfArray<number> = [2, 3, 4, 5]

// 数组的 readOnly 修饰符
function doStuff(arr: readonly string[]) {
  arr.slice()
  // 使用push 会改变原数组，ts 会报错
}

// 元组
type Tuple = [number, string]
const tuple: Tuple = [1, '2']

type PointTest = [number, number]
function getPointTest([x, y]: PointTest) {
  return x + y
}
const point: PointTest = [1, 2]
getPointTest(point)

// 泛型中使用extends和keyof语法
interface Peroson {
  name: string
}
function getName(person: Peroson) {
  return person.name
}
getName({ name: '孙悟空' })
getName({ name: '孙悟空', age: 100 }) // 就会报错

// 可以进行如下修改
function getNameNew<T extends Peroson>(person: T) {
  return person.name
}
getNameNew({ name: '孙悟空' })
getNameNew({ name: '孙悟空', age: 100 }) // 不会报错

// keyof
interface Teacher {
  name: string
  age: number
  sex: 'male' | 'female'
}
const teacher: Teacher = {
  name: '唐僧',
  age: 100,
  sex: 'male',
}
function getTeacherInfo<T extends keyof Teacher>(teacher: Teacher, key: T) {
  return teacher[key]
}

getTeacherInfo(teacher, 'def') // 这里乱写就会报错，只能是 Teacher 类型的 key 值
getTeacherInfo(teacher, 'name')

// 条件类型
// 是根据条件，生成一个新的类型
interface AnimalTest {
  breath: () => {}
}
interface DogTest extends AnimalTest {
  bark: () => {}
}
interface Tank {
  ph: number
}

type Example = Dog extends Animal ? string : number
// 使用条件类型的例子
interface IdLable {
  id: number
}
interface NameLabel {
  name: string
}
//当然使用函数重载一样可以实现，不过比较麻烦，如下
// function createLabel(key: string): IdLable
// function createLabel(key: number): NameLabel
// function createLabel(key: string | number): IdLable | NameLabel {
//   if (typeof key === 'string') {
//     return { name: key }
//   }
//   return { id: key }
// }
// const label = createLabel('孙悟空')

type IdOrNameLable<T> = T extends number ? IdLable : NameLabel
function createLabel<T extends string | number>(key: T): IdOrNameLable<T>
function createLabel(key: string | number): IdLable | NameLabel {
  if (typeof key === 'string') {
    return { name: key }
  }
  return { id: key }
}
const labelString = createLabel('孙悟空')
const labelNumber = createLabel(1122)

type TypeOfMessageOf<T> = T extends { message: unknown } ? T['message'] : never
type Message = TypeOfMessageOf<{ message: string }> // 此时 Type Message 是 string 类型
type Messag1 = TypeOfMessageOf<string> // 此时 Type Message1 是 never 类型

interface Email {
  from: string
  to: string
  message: string
}

// type EmailMessage = string

const emailObject: Email = {
  from: 'from@qq.com',
  to: 'to@qq.com',
  message: 'hello i send a message to you',
}
const email: TypeOfMessageOf<Email> = 'hello it is a message'

type GetReturnType<T> = T extends (...args: never[]) => infer ReturnType
  ? ReturnType
  : never

type ExampleType = GetReturnType<() => string> // 推断出 ExampleType 是 string
type ExampleType2 = GetReturnType<string> // 推断出 ExampleType 是 never

type ToArray<Type> = Type extends any ? Type[] : never
type StringArray = ToArray<string> // 推断出 StringArray 类型是 string[]
type StringArray1 = ToArray<string | number> // 推断出 StringArray1 类型是 number[] | string[]
type StringArrray2 = ToArray<never> // 推断出 StringArray2 类型是 never

type ToArrayTest<T> = [T] extends [any] ? T[] : never
type StringOrNumberArray = ToArrayTest<string | number> // 推断出 StringArray 类型是 (string | number)[]

// 映射类型
interface User {
  name: string
  age: number
  male: boolean
}

// type DeleteMaleProperty<T> = {
//   [Property in keyof T as Exclude<Property, 'male'>]: T[Property]
// }

// type UserWithoutGender = DeleteMaleProperty<User> // 类型目前是 { name: string, age: number }

// const user: UserWithoutGender = { name: '孙悟空', age: 500 }

// 想要构建如下的类型，
// interface UserFunctions {
//   getName: () => string
//   getAge: () => number
//   getMale: () => boolean
// }

//Capitalize: 转换字符串字面量的第一个字母为大写字母
type GetPropertyFunctions<T> = {
  [Property in keyof T as `get${Capitalize<
    string & Property
  >}`]: () => T[Property]
}

type UserFunctions = GetPropertyFunctions<User>

type SquareEvent = {
  kind: 'square'
  x: number
  y: number
}

type CircleEvent = {
  kind: 'circle'
  radius: number
}

type GenerateEventsFunctions<T extends { kind: string }> = {
  [Event in T as Event['kind']]: (event: Event) => void
}

type NewType = GenerateEventsFunctions<SquareEvent | CircleEvent>
// 此时 NewType 类型为 { square: (event: SquareEvent) => void; circle: (event: CircleEvent) => void; }

class PersonTest {
  name: string = '孙悟空'
  getName() {
    return this.name
  }
}
const person = new PersonTest()
console.log(person.getName())

class Teacher extends PersonTest {
  getTeacherName() {
    return '唐僧'
  }
  // 也可以对同名方法进行重写
  getName() {
    const name = super.getName() + '和' + '金蝉子'
    return name
  }
}

const teacherTest = new Teacher()
console.log(teacherTest.getName())
console.log(teacherTest.getTeacherName())
// 类中的访问类型和构造器
// private protected public 访问类型
// public: 允许我在类的内外被调用
// class PersonTestTwo {
//   //  传统写法
//   // public name: string
//   // constructor(name: string) {
//   //   this.name = name
//   // }
//   // 简化写法
//   constructor(public name: string) {
//     this.name = name
//   }
// }
// const perosonTestTwo = new PersonTestTwo('猪八戒')
// console.log(perosonTestTwo.name)

class PersonTwo {
  constructor(public name: string) {}
}

class TeacherTestTwo extends PersonTwo {
  constructor(public age: number) {
    super('teacher')
    this.age = age
  }
}
const teacherTestTwo = new TeacherTestTwo(28)
console.log(teacherTestTwo.name)
console.log(teacherTestTwo.age)

// 静态属性 setter 和 getter
class PersonTestThree {
  constructor(private _name: string) {}
  get name() {
    return '我的名字' + this._name
  }
  set name(value: string) {
    const realName = value.split(' ')[0]
    this._name = realName
  }
}
const personTestThree = new PersonTestThree('孙悟空')
console.log(personTestThree.name)
personTestThree.name = 'hello world'
console.log(personTestThree.name)

// 单例模式
class Demo {
  private static instance: Demo

  private constructor(public name: string) {}

  // static 类属性
  static getInstance() {
    if (!this.instance) {
      this.instance = new Demo('孙悟空')
    }
    return this.instance
  }
}

const demo1 = Demo.getInstance()
const demo2 = Demo.getInstance()
const demo3 = Demo.getInstance()
console.log(demo1 === demo2, demo2 === demo3)

class PersonTestFour {
  constructor(public name: string) {}
}

const personTestFour = new PersonTestFour('猪八戒')

// 抽象类
abstract class Geom {
  getType() {
    return 'Gemo'
  }
  abstract getArea(): number
}

class CircleShap extends Geom {
  getArea(): number {
    return 123
  }
}
class SquareShap extends Geom {
  getArea(): number {
    return 345
  }
}

interface PersonInfo {
  name: string
}

interface TeacherInfo extends PersonInfo {
  teacherAge: number
}
interface StudentInfo extends PersonInfo {
  age: number
}
const teacherInfo = { name: '唐僧', teacherAge: 3 }
const studentInfo = { name: '猪八戒', age: 300 }
const getUserInfo = (user: PersonInfo) => {
  console.log(user.name)
}

getUserInfo(teacherInfo)
getUserInfo(studentInfo)

// 联合类型和类型保护
interface BirdTest {
  fly: boolean
  sing: () => {}
}
interface DogTest {
  fly: boolean
  bark: () => {}
}
// 类型断言的方式
function trainAnimal(animal: BirdTest | DogTest) {
  if (animal.fly) {
    ;(animal as BirdTest).sing()
  } else {
    ;(animal as DogTest).bark()
  }
}
// 使用 in 语法做类型保护
function trainAnimalSecond(animal: BirdTest | DogTest) {
  if ('sing' in animal) {
    animal.sing()
  } else {
    animal.bark()
  }
}
// 使用 typeof来做类型保护
function addTestOne(first: number | string, second: string | number) {
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`
  }
  return first + second
}

// 使用 instanceof 来做类型保护
class NumberObj {
  count: number
}
function addTestSecond(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count
  }
  return 0
}
// 等等
