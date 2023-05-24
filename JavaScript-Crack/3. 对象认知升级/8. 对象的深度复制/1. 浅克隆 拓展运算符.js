const person = {
  name: '帅哥',
  age: 18,
  getName: function () {
    return this.name
  },
  address: {
    province: '北京',
  },
}

const person2 = { ...person }

person2.name = '帅哥2'
person2.getName = function () {
  return `person2` + this.name
}
person2.address.province = '上海'

console.log('person.name:', person.name)
console.log('person.getName:', person.getName.toString())
/**
person.name: 帅哥
person.getName: function () {
    return this.name
  }
person.address.province: 上海
*/
