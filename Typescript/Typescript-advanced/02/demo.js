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
