function Parent(name, age) {
  this.name = name
  this.age = age
}
Parent.prototype.friends = ['小张', '小李']
Parent.prototype.eat = function () {
  console.log(this.name)
}

function Son(favor, sex) {
  this.favor = favor
  this.sex = sex
}
const parent = new Parent('王五', 30)
console.log('parent', parent)
const sonObj = new Son('打篮球', '男')
console.log('sonObj', sonObj)
console.log('Son.prototype', Son.prototype)

Son.prototype = new Parent('王六', 38)
let sonObj2 = new Son('打篮球', '男')
console.log('Son.prototype 原型链继承之后的指向', Son.prototype)
console.log('sonObj2', sonObj2)
console.log(
  'sonObj2访问son类自身的favor属性【构造函数中this定义的对象属性】',
  sonObj2.favor,
)
console.log('sonObj2访问son对象原型上的name属性', sonObj2.name)
console.log('sonObj2访问friends属性', sonObj2.friends)
