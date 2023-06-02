// Array
let arr = [1, 2, 5]
// Object
let user = {
  name: 'Jason',
  age: 24,
}

//Date
let now = new Date()

// Function
function fun() {
  return 10
}
console.log('Array:', arr.toString()) // Array: 1,2,5
console.log('Object:', user.toString()) // Object: [object Object]
console.log('Date:', now.toString()) // Date: Wed May 24 2023 09:59:27 GMT+0800 (China Standard Time)
console.log('Function:', fun.toString()) //  Function: function fun() { return 10 }

// hint 是  default， valueOf => toString
console.log(1 + now) // 1Wed May 24 2023 09:59:27 GMT+0800 (China Standard Time)
