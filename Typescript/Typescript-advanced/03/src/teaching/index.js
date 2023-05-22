'use strict'
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var argsnum = arguments.length,
      atargetInfo =
        argsnum < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      decorator
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') {
      atargetInfo = Reflect.decorate(decorators, target, key, desc)
    } else {
      for (var i = decorators.length - 1; i >= 0; i--) {
        if ((decorator = decorators[i])) {
          atargetInfo =
            (argsnum < 3
              ? decorator(atargetInfo)
              : argsnum > 3
              ? decorator(target, key, atargetInfo)
              : decorator(target, key)) || atargetInfo
        }
      }
    }
    return (
      argsnum > 3 &&
        atargetInfo &&
        Object.defineProperty(target, key, atargetInfo),
      atargetInfo
    )
  }
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v)
  }
function FirstClassDecorator(targetClass) {
  var targetClassObj = new targetClass()
  targetClassObj.buy()
}
var CustomerService = /** @class */ (function () {
  function CustomerService() {
    this.name = '下单'
  }
  CustomerService.prototype.buy = function () {
    console.log(this.name + '购买')
  }
  CustomerService.prototype.placeOrder = function () {
    console.log(this.name + '下单购买')
  }
  CustomerService = __decorate(
    [FirstClassDecorator, __metadata('design:paramtypes', [])],
    CustomerService,
  )
  return CustomerService
})()
function toNumber(val) {
  return +val
}
toNumber(null) // 0
toNumber({}) //NaN
toNumber('10px') //NaN
toNumber(undefined) // NaN
toNumber(true) // 1

// toNumber(10n)
// toNumber(Symbol(1))

// function toNumber(val) {
//   return val >> 0
// }

// function toNumber2(val) {
//   return al >>> 0
// }

var count = 100000
var func = function () {}

var startTime = new Date()
console.log(typeof func === 'function')

for (let index = 0; index < count; index++) {
  typeof func === 'function'
}
console.log(
  "[typeof func === 'function']" + (new Date().getTime() - startTime.getTime()),
)

startTime = new Date()
for (let index = 0; index < count; index++) {
  func instanceof Function
}
console.log(
  '[instace of Function]' + (new Date().getTime() - startTime.getTime()),
)
const print = console.log
print(Object.getOwnPropertyDescriptor(global, 'null')) //  undefined
print(Object.getOwnPropertyDescriptor(global, 'undefined')) // { value: undefined,  writable: false, enumerable: false, configurable: false }

function MyArray() {}
const myArray = new MyArray()
// myArray.prototype.constructor = MyArray
console.log(Object.prototype.toString.call(MyArray))

class MyArray {
  get [Symbol.toStringTag]() {
    return 'MyArray'
  }
}

var pf = console.log
var a = new MyArray()
console.log(Object.prototype.toString.call(a))

Object.getOwnPropertyDescriptor(window, 'undefinded')

// function format_with_array(number) {
//   var n = number
//   var r = ''
//   var temp
//   do {
//     // 求模的值，用于获取最高三位，这里可能会有小数
//     mod = n % 1000
//     // 值是不是大于1，是继续的条件
//     n = n / 1000
//     // 高三位
//     temp = ~~mod
//     // 1、填充：n>1循环未结束，就要填充为比如 1 =》 不然 1001就会变成 11
//     // 2、拼接 ","
//     r = (n >= 1 ? `${temp}`.padStart(3, '0') : temp) + (!!r ? ',' + r : '')
//   } while (n >= 1)
//   var strNumber = number + ''
//   var index = strNumber.indexOf('.')
//   // 拼接小书部分
//   if (index >= 0) {
//     r += strNumber.substring(index)
//   }
//   return r
// }

// console.log(format_with_array(9398222.02))

function format_with_array(number) {
  var reg = /\d{1,3}(?=(\d{3})+$)/g
  return (number + '').replace(reg, '$&,')
}
console.log(format_with_array(9398222)) // 9,398,222.02
