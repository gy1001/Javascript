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
// function getNameDecerator(
//   target: any,
//   key: string,
//   descriptor: PropertyDescriptor,
// ) {
//   // 不允许被重写
//   descriptor.writable = false
//   descriptor.value = function () {
//     return '我是新的值'
//   }
// }

// class Test {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
//   @getNameDecerator
//   getName() {
//     return this.name
//   }
// }
// const test = new Test('唐僧')

// console.log(test.getName()) // 我是新的值
// // 装饰器中设置 descriptor.writable = false 再次运行就会如下错误
// // Cannot assign to read only property 'getName' of object '#<Test>'
// // test.getName = function () {
// //   return '23333'
// // }

// 访问器装饰器
// function visiDecorator(
//   target: any,
//   key: string,
//   descriptor: PropertyDescriptor,
// ) {
//   descriptor.writable = false
// }

// class Test {
//   private _name: string
//   constructor(name: string) {
//     this._name = name
//   }
//   get name() {
//     return this._name
//   }
//   @visiDecorator
//   set name(name: string) {
//     this._name = name
//   }
// }

// const test = new Test('唐僧')
// // 此时因为 descriptor.writable = false 所以这里运行会报错
// // test.name = '1123'
// console.log(test.name) // 1123

// 属性装饰器
// function nameDecorator(target: any, key: string): any {
//   console.log(target, key)
//   const descriptor: PropertyDescriptor = {
//     writable: false,
//   }
//   return descriptor
// }

// class Test {
//   @nameDecorator
//   name = '唐僧'
// }

// const test = new Test()
// setTimeout(() => {
//   test.name = '猪八戒' // 这里会报错
// }, 1000)
// console.log(test.name)

// 装饰器这里修改的是原型上的 name
// function nameDecorator(target: any, key: string): any {
//   // target[key] = '菩提祖师'
//   return {
//     writable: true,
//     // configurable: true,
//     value: '猪八戒',
//   }
// }
// // 这里的属性 name 是放在了实例中
// class Test {
//   @nameDecorator
//   name = '唐僧'
// }

// const test = new Test()
// // 这里调用时候肯定先从实例上寻找
// console.log(test.name) // 唐僧
// console.log((test as any).__proto__.name) // 猪八戒

// 参数装饰器

// function paramDecorator(target: any, method: string, paramIndex: number) {
//   // target[method] = ''
//   console.log(target, method, paramIndex)
// }
// class Test {
//   getInfo(@paramDecorator name: string, age: number) {
//     return `${name}的年龄是${age}`
//   }
// }

// const test = new Test()
// console.log(test.getInfo('孙悟空', 500))

// 装饰器实际使用的小例子
function catchError(msg: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = function () {
      try {
        fn()
      } catch (e) {
        console.log(msg)
      }
    }
  }
}
const userInfo: any = undefined
class Test {
  @catchError('userInfo.name 不存在')
  getName() {
    return userInfo.name
  }
  @catchError('userInfo.age 不存在')
  getAge() {
    return userInfo.age
  }
}

const test = new Test()
console.log(test.getName())
console.log(test.getAge())
