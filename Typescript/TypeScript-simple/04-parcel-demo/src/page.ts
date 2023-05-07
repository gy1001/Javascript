// const teacher: string = '唐僧'
// console.log(teacher)

// import $ from 'jquery'

// $(function () {
//   $('body').html('<h1>123</h1>')
//   new $.fn.init()
// })

interface Person {
  name: string
  age: number
  gender: string
}
class Teacher {
  constructor(private info: Person) {}

  getInfo<T extends keyof Person>(key: T) {
    return this.info[key]
  }
}
const teacher = new Teacher({
  name: '唐僧',
  age: 100,
  gender: 'male',
})
const test = teacher.getInfo('name')
console.log(test)
