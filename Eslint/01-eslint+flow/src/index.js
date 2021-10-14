// @flow
import { promise } from './utils'

function a() {
  return '1111'
}

console.log(a())

const b = () => {
  console.log('我是箭头函数')
}

b()

promise().then((result) => {
  console.log(result)
})

class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  say() {
    console.log(`我是class,name是${this.name}`)
  }
}
const tom = new Person('tom')
tom.say()

function sum(a: number, b: string) {
  return a + b
}

sum(12, 1)
