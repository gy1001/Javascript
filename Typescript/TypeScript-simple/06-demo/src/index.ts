// function testDecorator(constructor: any) {
//   console.log('testDecorator')
//   constructor.prototype.getName = function () {
//     console.log('唐僧')
//   }
// }
// function testDecoratorTwo(constructor: any) {
//   console.log('testDecoratorTwo')
// }

// function shouleRunDerector(flag: boolean) {
//   if (flag) {
//     return function testDecorator(constructor: any) {
//       console.log('testDecorator')
//     }
//   } else {
//     return function testDecorator() {}
//   }
// }

// // @testDecorator
// // @testDecoratorTwo
// @shouleRunDerector(true)
// class Test {}

// @shouleRunDerector(false)
// class TestTwo {}

// const test = new Test()

// 第二部分
function testDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    name = '菩提老祖'
    age = 100
    getName() {
      return this.name
    }
  }
}

@testDecorator
class Test {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

const test = new Test('唐僧')
console.log(test) // Test { name: '菩提老祖', age: 100 }
console.log((test as any).getName()) // 菩提老祖
