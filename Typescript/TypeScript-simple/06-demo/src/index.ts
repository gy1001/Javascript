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
// function testDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
//   return class extends constructor {
//     name = '菩提老祖'
//     age = 100
//     getName() {
//       return this.name
//     }
//   }
// }

// @testDecorator
// class Test {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
// }

// const test = new Test('唐僧')
// console.log(test) // Test { name: '菩提老祖', age: 100 }
// console.log((test as any).getName()) // 菩提老祖

// 方法装饰器
// 普通方法中，target 对应的是 property, key: 装饰的方法的名字
// 静态方法中，target 对应的是类的构造函数
function getNameDecerator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) {
  // 不允许被重写
  descriptor.writable = false
  descriptor.value = function () {
    return '我是新的值'
  }
}

class Test {
  name: string
  constructor(name: string) {
    this.name = name
  }
  @getNameDecerator
  getName() {
    return this.name
  }
}
const test = new Test('唐僧')

console.log(test.getName()) // 我是新的值
// 装饰器中设置 descriptor.writable = false 再次运行就会如下错误
// Cannot assign to read only property 'getName' of object '#<Test>'
// test.getName = function () {
//   return '23333'
// }
