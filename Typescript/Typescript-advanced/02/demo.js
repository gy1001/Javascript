// function Parent(name, age) {
//   this.name = name
//   this.age = age
// }
// Parent.prototype.friends = ['小张', '小李']
// Parent.prototype.eat = function () {
//   console.log(this.name)
// }

// function Son(favor, sex) {
//   this.favor = favor
//   this.sex = sex
// }
// const parent = new Parent('王五', 30)
// console.log('parent', parent)
// const sonObj = new Son('打篮球', '男')
// console.log('sonObj', sonObj)
// console.log('Son.prototype', Son.prototype)

// Son.prototype = new Parent('王六', 38)
// let sonObj2 = new Son('打篮球', '男')
// console.log('Son.prototype 原型链继承之后的指向', Son.prototype)
// console.log('sonObj2', sonObj2)
// console.log(
//   'sonObj2访问son类自身的favor属性【构造函数中this定义的对象属性】',
//   sonObj2.favor,
// )
// console.log('sonObj2访问son对象原型上的name属性', sonObj2.name)
// console.log('sonObj2访问friends属性', sonObj2.friends)

// People父类构造函数：看成是一个父类
function People(name, sex, phone) {
  this.name = name // 实例属性
  this.sex = sex
  this.phone = phone
}

People.prototype.doEat = function () {
  console.log(this.name + '吃饭...')
}

// ChinesePeople 子构造函数【看成一个子类】
function ChinesePeople(name, sex, phone, national) {
  People.apply(this, [name, sex, phone]) // 借用父类构造函数
  this.national = national // 名族
}

// function _extends(parent, son) {
//   // 第一步：创建一个寄生构造函数
//   function Middle() {
//     // 此处毫无意义，只是为了测试
//     this.count = 1
//     this.constructor = son
//   }

//   Middle.prototype = parent.prototype
//   return new Middle()
// }

function _extends(parent) {
  let middle = { count: 1 }
  return Object.setPrototypeOf(middle, parent.prototype)
}
ChinesePeople.prototype = _extends(People, ChinesePeople)
ChinesePeople.prototype.constructor = ChinesePeople // 需要额外增加子构造函数指向
const chinesePeopleOne = new ChinesePeople('王海', '女', 1111, '汉族')
console.log(chinesePeopleOne)

// class Person {
//   // 私有属性
//   #canTalk = true
//   // 静态属性
//   static isAnimal = true

//   constructor(name, age) {
//     // 实例属性
//     this.name = name
//     // 实例属性
//     this.age = age
//   }
//   // 原型属性
//   sayName() {
//     console.log(this.name)
//   }
// }

const proto = Boolean.prototype
console.log(typeof proto)
console.log(Object.prototype.toString.call(proto))

// 普通函数
function a() {}
console.log(a.__proto__.__proto__.__proto__) // null

// 作为构造函数
// function Person() {}
// var person = new Person()
// console.log(person.__proto__.__proto__.__proto__) // null

// // 参数： instance： 实例 cclass: 构造函数
function instanceOf(instance, cclass) {
  let proto = instance.__proto__
  let prototype = cclass.prototype
  while (proto) {
    if (proto === prototype) return true
    proto = proto.__proto__
  }
  return false
}

// class Parent {}
// class Child extends Parent {}
// class CChild extends Child {}
// class Luren {}
// const cchild = new CChild()

// console.log(instanceOf(cchild, Parent)) // true
// console.log(instanceOf(cchild, Child)) // true
// console.log(instanceOf(cchild, CChild)) // true
// console.log(instanceOf(cchild, Object)) // true
// console.log(instanceOf(cchild, Date)) // false
// console.log(instanceOf(cchild, Luren)) // false

const getType = (val) => Object.prototype.toString.call(val)
function getPrototypeChains(instance) {
  const chains = []
  let proto = instance.__proto__
  chains.push(getType(proto))
  while (proto) {
    proto = proto.__proto__
    chains.push(getType(proto))
  }
  return chains
}

console.log(getPrototypeChains(Function)) // ['[object Function]', '[object Object]', '[object Null]']
console.log(getPrototypeChains(Object)) // ['[object Function]', '[object Object]', '[object Null]']

console.log(Object.isPrototypeOf({})) // false
console.log(Object.prototype.isPrototypeOf({})) // true
console.log(Reflect.isPrototypeOf({})) // false
console.log(Function.isPrototypeOf({})) // false

// const symbolSay = Symbol.for('say1')
// class Person {
//   static flag = '人'
//   static getFlag() {
//     return Person.flag
//   }
//   static [Symbol.for('symbolPro')]() {
//     return 'symbolPro'
//   }
//   constructor(name) {
//     this.name = name
//     this[symbolSay] = 'haha'
//   }
//   getName() {
//     return this.name
//   }
//   getAge = () => {
//     return 15
//   }
// }
// function getOwnPropertyStatics(_obj) {
//   const KNOWN_STATICS = {
//     name: true,
//     length: true,
//     prototype: true,
//     caller: true,
//     callee: true,
//     arguments: true,
//     arity: true,
//   }
//   let result = []

//   // const keys = Reflect.ownKeys(_obj)
//   const keys = Object.getOwnPropertyNames(_obj).concat(
//     Object.getOwnPropertySymbols(_obj),
//   )
//   for (let index = 0; index < keys.length; index++) {
//     const key = keys[index]
//     if (!KNOWN_STATICS[key]) {
//       result.push(key)
//     }
//   }
//   return result
// }

// console.log(getOwnPropertyStatics(Person)) // ['getFlag', 'flag', Symbol(symbolPro)]

// class Grand {
//   gName = 'Grand'
//   gGetName() {
//     return this.gName
//   }
// }
// Grand.prototype[Symbol.for('gAge')] = 'G-12'

// class Parent extends Grand {
//   pName = '123'
//   pGetName() {
//     return this.pName
//   }
// }
// Parent.prototype[Symbol.for('pAge')] = 'G-11'

// class Child extends Parent {
//   cName = '123'
//   cGetName() {
//     return this.cName
//   }
// }
// const child = new Child()

// const result = []
// function logAllProperties(instance) {
//   if (instance == null) {
//     return
//   }
//   let proto = instance.__proto__
//   while (proto) {
//     result.push(...Reflect.ownKeys(proto))
//     proto = proto.__proto__
//   }
// }
// logAllProperties(child)
// console.log('result == ', result)
// //  ['constructor', 'cGetName', 'constructor', 'pGetName', Symbol(pAge), 'constructor', 'gGetName', Symbol(gAge), 'constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', '__proto__', 'toLocaleString']