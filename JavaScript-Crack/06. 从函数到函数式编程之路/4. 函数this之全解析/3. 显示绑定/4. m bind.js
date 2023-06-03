var person1 = {
  name: 'name1',
}
var person2 = {
  name: 'name2',
}

function getName() {
  console.log(this)
  return this.name
}

console.log(getName.bind(person1).bind(person2)())
// name1
