// 类的简介
class Person{
  // 直接定义的属性是实例属性，需要通过对象实例进行访问
  name: string = "孙悟空"
  age: number = 18
  // 在属性前面使用 static 关键字可以定义类属性(静态属性)
  static gender:number = 1 // 静态属性只能类调用，不能示例调用
  // readonly 只读属性
  constructor(){

  }

}

const per = new Person()
console.log(per.name)


// abstract 放在一个类的前面说明这个类是抽象类
// 抽象类和其他类的区别不大，知识不能被用来实例化
// 也就是说抽象类只能用来被继承
abstract class Animal {
  name: string
  age: number
  constructor(name:string, age:number) {
    this.name = name
    this.age = age
  }

  // abstract 定义一个抽象方法
  // 抽象方法使用 abstract 开头，没有方法体
  // 抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写
  abstract sayHello():void
}

// 定义一个对象的类型
type myType = {
  name: string,
  age: number
}

const obj:myType = {name:'123',age:19}
const obj1:myInterFace = {name:'123',age:19,gender:'11'}
// 接口用来定义一个类的结构, 用来定义一个类中应该包含那些属性和方法
// 同时接口也可以当成类型声明去使用

// 创建同名接口时候，规则是合并
interface myInterFace{
  name: string,
  age: number
}

interface myInterFace{
  gender: string
}

// 同时接口可以在定义类的时候去限制类的结构
// 接口中的所有属性都不能有实际的值
// 接口指定义类的结构，而不考虑实际值
// 在接口中所有的方法都是抽象方法
interface myInter{
  name: string,
  sayHello():void
}

class myClass implements myInter{
  name: string
  constructor(name:string){
    this.name = name
  }
  sayHello(): void {
    console.log("hello")
  }
  
}

class MyPerson {
  // ts可以在属性前添加属性的修饰符
  // public 修饰的属性可以在任意位置访问或者修改
  // private 私有属性，只能在类内部进行修改
  // 可以通过添加方法的方式类来进行修改访问内部私有属性
  // protected 受保护的属性，只能在当前类和它的继承类中进行访问修改
  private _age: number
  private _name: string

  constructor(name:string,age:number){
    this._age = age
    this._name = name
  }

  //getName(){
  //  return this._name 
  //}

  //setName(name:string){
  //  this._name = name
  //}

  // 还有一种方法类设置和获取属性
  get name(){
    return this._name
  }

  set name(name:string){
    this._name = name
  }

}

const per1 = new MyPerson("孙悟空", 18)


// 泛型
// 在定义函数或者类的时候，如果遇到类型不明确的时候就可以使用泛型

function fn<T>(a:T):T{
  return a 
}

fn(10)   // 调用时候才确定 泛型 T 为 number 类型，返回值也为 number 类型
fn("10") // 调用时候才确定 泛型 T 为 string 类型，返回值也为 string 类型

let result = fn<string>("10") // 指定泛型

// 泛型可以同时指定多个
function fn2<T,K>(a:T,b:K){
  console.log(b)
  return a 
}

fn2<number, string>(1,"hello")
interface MyInter{
  length: number
}
// T extends Inter 表示泛型 T 必须继承 MyInter 实现类（子类）
function fn3<T extends MyInter>(a: T):number{
  return a.length
}
console.log(fn3(1))// 报错。
console.log(fn3("1111"))// 正确
console.log(fn3({name:'ee3ee'}))// 报错
console.log(fn3({length: 111}))// 正确


// 类也可以用泛型
class OtherClass<T> {
  name: T
  constructor(name:T){
    this.name = name
  }
}

let ani = new OtherClass("孙悟空")