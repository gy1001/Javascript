// T extends U ? X : Y
type TypeName<T> = 
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" : 
  "object"

type T1 = TypeName<string>
type T2 = TypeName<string[]>


// 分布式条件类型
// (A|B) extends U ? X : Y
// 相当于 A extends U ? X : Y ｜ B extends U ? X : Y

type T3 = TypeName<string | string[]>

type Diff<T,U> = T extends U ? never : T

type T4 = Diff<"a"|"b"|"c", "a" | "e"> // 这样就过滤了 第二个参数中共有的  a 
// 拆解为
// Diff<"a", "a" | "e"> | Diff<"b", "a" | "e"> | Diff<"c", "a" | "e"> 
// never | "b" | "c"
// "b" | "c"

type NotNull<T> = Diff<T, undefined | null> 
// 过滤掉 undefined null
type T5 = NotNull<string| number | undefined | null>
// type T5 = string | number

// 官方预制的 Exclude<T, U> 就可以实现上面过滤功能
// 还有 NotNullable<T>
// Extract<T, U>

type T6 = Extract<"a"|"b"|"c", "a"|"e">

// ReturnType<T>
type T7 = ReturnType<()=>never>