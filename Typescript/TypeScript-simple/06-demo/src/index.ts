// function testDecorator(constructor: any) {
//   console.log('testDecorator')
//   constructor.prototype.getName = function () {
//     console.log('唐僧')
//   }
// }
// function testDecoratorTwo(constructor: any) {
//   console.log('testDecoratorTwo')
// }

function shouleRunDerector(flag: boolean) {
  if (flag) {
    return function testDecorator(constructor: any) {
      console.log('testDecorator')
    }
  } else {
    return function testDecorator() {}
  }
}

// @testDecorator
// @testDecoratorTwo
@shouleRunDerector(true)
class Test {}

@shouleRunDerector(false)
class TestTwo {}

const test = new Test()
