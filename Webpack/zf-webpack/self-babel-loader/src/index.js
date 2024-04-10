console.log('hello babel-loader')

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  sayHello() {
    console.log('hello')
  }
}

const p = new Person('zf', 10)
console.log(p.sayHello())
