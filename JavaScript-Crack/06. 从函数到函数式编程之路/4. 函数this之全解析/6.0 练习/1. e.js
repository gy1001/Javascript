var name = 'window'
var obj = { name: '张三' }

function logName() {
  console.log(this.name)
}

function logName2() {
  'use strict'
  console.log(this.name)
}

var person = {
  name: 'person',
  logName,
  logName2: () => logName(),
}

logName() // window
person.logName() // person
person.logName2() // person
logName.bind(obj)() // 张三
logName2() // 报错
