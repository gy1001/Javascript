let obj = {
  a: 1,
  b: 2,
  c: 3
}

//function getValues(obj: any, keys:string[]){
//  return keys.map(key => obj[key])
//}
console.log(getValues(obj, ['a', 'b']))
console.log(getValues(obj, ['', 'e', 'f'])) // ["undefined", "undefined", "undefined"]

// keyof T
interface Obj{
  a: number,
  b: string
}

let key: keyof Obj // "a" "b"

// T[k] 表示 T的属性K代表的类型
let value:Obj["a"]  = 1

// T extends U

// 改造
function getValues<T, K extends keyof T>(obj: T, keys:K[]):T[K][]{
  return keys.map(key => obj[key])
}