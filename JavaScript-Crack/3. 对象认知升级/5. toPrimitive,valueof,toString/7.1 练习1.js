const arr = [4, 10]
arr[Symbol.toPrimitive] = function (hint) {
  return hint
}
arr.valueOf = function () {
  return this
}

const obj = {}

console.log(+arr + obj + arr + obj)
// NaN[object Object]default[object Object]
console.log(NaN + obj)
// NaN[object Object]

console.log({} + arr)
// [object Object]default
