const obj = {},
  objA = {
    propertyA: 'A',
    toString() {
      return 'objA'
    },
  },
  objB = {
    propertyB: 'B',
    valueOf() {
      return 'b'
    },
  }

obj[objA] = 'objectA'
obj[objB] = 'ObjectB'
console.log('123' + objA) // 123objA
console.log('123' + objB) // 123b
console.log('123' + objB) // 123b
console.log(String(objB)) // [object Object]

for (let [p, v] of Object.entries(obj)) {
  console.log('p:', p, ', v:', v)
}
