const arr = [1, 2, 3]

// 拓展运算符
const arr2 = [...arr]

const arr3 = arr.slice(0)

const arr4 = [].concat(arr)

console.log('arr', arr)
console.log('arr2', arr2, arr2 == arr)
console.log('arr3', arr3, arr3 == arr)
console.log('arr4', arr4, arr4 == arr)
/**
arr [ 1, 2, 3 ]
arr2 [ 1, 2, 3 ] false
arr3 [ 1, 2, 3 ] false
arr4 [ 1, 2, 3 ] false 
*/
