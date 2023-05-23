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

// // People父类构造函数：看成是一个父类
// function People(name, sex, phone) {
//   this.name = name // 实例属性
//   this.sex = sex
//   this.phone = phone
// }

// People.prototype.doEat = function () {
//   console.log(this.name + '吃饭...')
// }

// // ChinesePeople 子构造函数【看成一个子类】
// function ChinesePeople(name, sex, phone, national) {
//   People.apply(this, [name, sex, phone]) // 借用父类构造函数
//   this.national = national // 名族
// }

// // function _extends(parent, son) {
// //   // 第一步：创建一个寄生构造函数
// //   function Middle() {
// //     // 此处毫无意义，只是为了测试
// //     this.count = 1
// //     this.constructor = son
// //   }

// //   Middle.prototype = parent.prototype
// //   return new Middle()
// // }

// function _extends(parent) {
//   let middle = { count: 1 }
//   return Object.setPrototypeOf(middle, parent.prototype)
// }
// ChinesePeople.prototype = _extends(People, ChinesePeople)
// ChinesePeople.prototype.constructor = ChinesePeople // 需要额外增加子构造函数指向
// const chinesePeopleOne = new ChinesePeople('王海', '女', 1111, '汉族')
// console.log(chinesePeopleOne)

// function toNumber(val) {
//   return +val
// }
// toNumber(null) // 0
// toNumber({}) //NaN
// toNumber('10px') //NaN
// toNumber(undefined) // NaN
// toNumber(true) // 1

// // toNumber(10n)
// // toNumber(Symbol(1))

// // function toNumber(val) {
// //   return val >> 0
// // }

// // function toNumber2(val) {
// //   return al >>> 0
// // }

// var count = 100000
// var func = function () {}

// var startTime = new Date()
// console.log(typeof func === 'function')

// for (let index = 0; index < count; index++) {
//   typeof func === 'function'
// }
// console.log(
//   "[typeof func === 'function']" + (new Date().getTime() - startTime.getTime()),
// )

// startTime = new Date()
// for (let index = 0; index < count; index++) {
//   func instanceof Function
// }
// console.log(
//   '[instace of Function]' + (new Date().getTime() - startTime.getTime()),
// )
// const print = console.log
// print(Object.getOwnPropertyDescriptor(global, 'null')) //  undefined
// print(Object.getOwnPropertyDescriptor(global, 'undefined')) // { value: undefined,  writable: false, enumerable: false, configurable: false }

// function MyArray() {}
// const myArray = new MyArray()
// // myArray.prototype.constructor = MyArray
// console.log(Object.prototype.toString.call(MyArray))

// class MyArray {
//   get [Symbol.toStringTag]() {
//     return 'MyArray'
//   }
// }

// var pf = console.log
// var a = new MyArray()
// console.log(Object.prototype.toString.call(a))

// Object.getOwnPropertyDescriptor(window, 'undefinded')

// // function format_with_array(number) {
// //   var n = number
// //   var r = ''
// //   var temp
// //   do {
// //     // 求模的值，用于获取最高三位，这里可能会有小数
// //     mod = n % 1000
// //     // 值是不是大于1，是继续的条件
// //     n = n / 1000
// //     // 高三位
// //     temp = ~~mod
// //     // 1、填充：n>1循环未结束，就要填充为比如 1 =》 不然 1001就会变成 11
// //     // 2、拼接 ","
// //     r = (n >= 1 ? `${temp}`.padStart(3, '0') : temp) + (!!r ? ',' + r : '')
// //   } while (n >= 1)
// //   var strNumber = number + ''
// //   var index = strNumber.indexOf('.')
// //   // 拼接小书部分
// //   if (index >= 0) {
// //     r += strNumber.substring(index)
// //   }
// //   return r
// // }

// // console.log(format_with_array(9398222.02))

// function format_with_array(number) {
//   var reg = /\d{1,3}(?=(\d{3})+$)/g
//   return (number + '').replace(reg, '$&,')
// }
// console.log(format_with_array(9398222)) // 9,398,222.02

// function format_with_Intl(
//   number,
//   minimumFractionDigits,
//   maximumFractionDigits,
// ) {
//   minimumFractionDigits = minimumFractionDigits || 2
//   maximumFractionDigits = maximumFractionDigits || 2
//   maximumFractionDigits = Math.max(minimumFractionDigits, maximumFractionDigits)
//   return new Intl.NumberFormat('en-us', {
//     maximumSignificantDigits: maximumFractionDigits || 2,
//     minimumFractionDigits: minimumFractionDigits || 2,
//   }).format(number)
// }

// // 使用默认配置选项
// function format_with_Intl(number) {
//   return new Intl.NumberFormat('en-us').format(number)
// }

// console.log(format_with_Intl(9398222.02))

// 属性遍历
function CustomObject(eCount, pCount) {
  for (let index = 0; index < eCount; index++) {
    this[index] = `e-${index}`
  }
  // 添加常规属性
  for (let index = 0; index < pCount; index++) {
    this[`p-${index}`] = `p-${index}`
  }
}
// 排序属性6 普通属性 6个
// var obj = new CustomObject(6, 6)
// 排序属性6 普通属性 16个
var obj = new CustomObject(6, 50)

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName = () => {
    return this.name
  }
  getAge() {
    return this.age
  }
}
const hasOwn = Object.hasOwnProperty
const print = console.log
const person = new Person()
print('getName: ', hasOwn.call(person, 'getName')) // getName: true
print('getAge: ', hasOwn.call(person, 'getAge')) // getAge: false

// getName 是实例属性
// getAge 是原型属性

const obj = {}
Object.defineProperty(obj, 'name', {
  vaulue: 1,
  writable: false,
  configurable: false,
})
// 尝试修改描述信息
Object.defineProperty(obj, 'name', {
  value: 2,
  writable: false,
})
// 读取信息
console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
// { "writable": false, "enumerable": false, "configurable": false }
