interface Obj1{
  a: string;
  b: number;
  c: boolean;
}
// 把上面的所有属性变为只读
type ReadOnlyObj = Readonly<Obj1>

let a12:ReadOnlyObj = {
  a: "1",
  b: 2,
  c: true
}
a12.a = "2" // 报错，因为只读

// 把所有属性变为可选
type PartialObj = Partial<Obj1>
// 抽取 obj1 中的一些子集组成一个新的类型
type PickObj = Pick<Obj1, "a"|"b">

// 非同态类型
type RecordObj = Record<"x"|"y", Obj1>