let a = { n: 1 }
a.x = a = { n: 2 }

// 求a.x
console.log(a.x) // undefined
console.log(a) // { n: 2 }
