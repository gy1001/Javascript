let a :number;  // 声明一个变量a , 同时指定它的类型为 number
a = 10
//a = "hello" 此行代码报错



let e: unknown; // e 为 unkown 类型
e = 10
e = true
e = "hello"

let s:string // s为字符串类型
// s = e // 这里会报错

if(typeof e === "string"){
  s = e // 这样就不会报错
}

function b():void{
  return null
}

type StringOrNumberArray<E> = E extends string | number ? E[] : E;
type StringArray = StringOrNumberArray<string>; // 类型是 string[]
type NumberArray = StringOrNumberArray<number>; // 类型是 number[]
type NeverGot = StringOrNumberArray<boolean>; // 类型是 boolean


type BooleanOrString = string | boolean;
type WhatIsThis = StringOrNumberArray<BooleanOrString>; // 是 string[] | boolean
type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString; // string | boolean

{
  interface I1<T> {
    id: number;
  }
  let O1: I1<string>;
  let O2: I1<number>;
  O1 = O2; // ok
  let fun1 = <T>(p1: T): 1 => 1;
  let fun2 = <T>(p2: T): number => 2;
  fun2 = fun1; // ok？
}


{
  // 协变
  type isChild<Child, Par> = Child extends Par ? true : false;
  interface Animal {
    name: string;
  }
  interface Dog extends Animal {
    woof: () => void;
  }
  type Covariance<T> = T;
  type isCovariant = isChild<Covariance<Dog>, Covariance<Animal>>; // true

  // 实际上接口类型的属性、数组类型、函数返回值的类型都是协变的，
  type isPropAssignmentCovariant = isChild<{ type: Dog }, { type: Animal }>; // true
  type isArrayElementCovariant = isChild<Dog[], Animal[]>; // true
  type isReturnTypeCovariant  = isChild<() => Dog, () => Animal>; // true

  // 逆变
  type Contravariance<T> = (param: T) => void;
  type isNotContravariance = isChild<Contravariance<Dog>, Contravariance<Animal>>; // false;
  type isContravariance = isChild<Contravariance<Animal>, Contravariance<Dog>>; // true



  //interface Event {
  //  timestamp: number;
  //}
  //interface MouseEvent extends Event {
  //  x: number;
  //  y: number;
  //}
  //function addEventListener(handler: (n: Event) => void) {}
  //addEventListener((e: MouseEvent) => console.log(e.x + ',' + e.y)); 

  //let lessParams = (one: number) => void 0;
  //let moreParams = (one: number, two: string) => void 0;
  //lessParams = moreParams; // ts(2322)
  //moreParams = lessParams;


  class Animal1{
    x: number
    y: number
  }

  class Cat1 extends Animal1{
    say: "miaomiao"
  }

  class GrayCat1 extends Cat1{
    color: "gray"
  }

  let p1: Cat1 = {
    x: 1,
    y: 3,
    say: "miaomiao"
  }

  let p2:GrayCat1 = {
    x:1,
    y:2,
    color: "gray",
    say: "miaomiao"
  }
  p1 = p2

  //let a1 = (params: Cat1) => void 0
  //let b1 = (params:GrayCat1) => void 0
  //let c1 = (params:Animal1) => void 0
  //a1 = c1
  //a1 = b1 // error
  //b1 = a1
  //b1 = c1
  //c1 = a1 // error
  //c1 = b1 // error
}
{
  // never 是所有类型的子类型
  type StringOrNumberArray1<E> = [E] extends [string | number] ? E[] : E;
  type WhatIsThis1 = StringOrNumberArray1<string | boolean>; // string | boolean
  type GetSNums = never extends number ? number[] : never extends string ? string[] : never; // number[];
  type GetNever111 = StringOrNumberArray1<never>; // never[]
  
  type UsefulNeverX<T> = T extends {} ? T[] : [];
  type UselessNeverX<T, S> = S extends {} ? S[] : [];
  type UselessNeverY<T, S> = S extends {} ? T[] : [];
  type UselessNeverZ<T> = [T] extends [{}] ? T[] : [];
  type ThisIsNeverX = UsefulNeverX<never>; // never
  type ThisIsNotNeverX = UselessNeverX<never, string>; // string[]
  type ThisIsNotNeverY = UselessNeverY<never, string>; // never[]
  type ThisIsNotNeverZ = UselessNeverZ<never>; // never[]
}


{
  // 分配条件类型（Distributive Conditional Types）
  // 因为 never 是不能分配的底层类型
  type ElementTypeOfArray<T> = T extends (infer E)[] ? E : never;
  type isNumber = ElementTypeOfArray<number[]>; // number
  type isNever = ElementTypeOfArray<number>; // never
}

{
  // 条件类型中的类型推断 infer
  type ElementTypeOfObj<T> = T extends { name: infer E; id: infer I } ? [E, I] : never;
  type isArray = ElementTypeOfObj<{ name: 'name'; id: 1; age: 30 }>; // ['name', 1]
  type isNever = ElementTypeOfObj<number>; // never
}
{
  // 索引访问类型
  interface MixedObject {
    animal: {
      type: 'animal' | 'dog' | 'cat';
      age: number;
    };
    [name: number]: {
      type: string;
      age: number;
      nickname: string;
    };
    [name: string]: {
      type: string;
      age: number;
    };
  }
  type animal = MixedObject['animal'];
  type animalType = MixedObject['animal']['type'];
  type numberIndex = MixedObject[number];
  type numberIndex0 = MixedObject[0];
  type stringIndex = MixedObject[string];
  type stringIndex0 = MixedObject['string'];
  // keyof  使用 keyof 关键字提取对象属性名、索引名、索引签名的类型
  type MixedObjectKeys = keyof MixedObject; // string | number
  type animalKeys = keyof animal; // 'type' | 'age'
  type numberIndexKeys = keyof numberIndex; // "type" | "age" | "nickname"
  // typeof 则是用来获取表达式值的类型，如果在类型上下文中使用，则是用来获取变量或者属性的类型
  let StrA = 'a';
  const unions = typeof StrA; // unions 类型是 "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
  const str: typeof StrA = 'string'; // str 类型是 string
  type DerivedFromStrA = typeof StrA; // string
  // 对于任何未显式添加类型注解或值与类型注解一体（比如函数、类）的变量或属性，我们都可以使用 typeof 提取它们的类型，这是一个十分方便、有用的设计
  const animal = {
    id: 1,
    name: 'animal'
  };
  type Animal = typeof animal;
  const animalFun = () => animal;
  type AnimalFun = typeof animalFun;
  // 映射类型
  type SpecifiedKeys = 'id' | 'name';
  type TargetType1 = {
    [key in SpecifiedKeys]: any;
  }; // { id: any; name: any; }
  type TargetGeneric<O extends string | number | symbol> = {
    [key in O]: any;
  }
  type TargetInstance = TargetGeneric<SpecifiedKeys>; // { id: any; name: any; }
  // 注意：in 和 keyof 也只能在类型别名定义中组合使用
  interface SourceInterface {
    readonly id: number;
    name?: string;
  }
  type TargetType = {
    [key in keyof SourceInterface]: SourceInterface[key];
  }; // { readonly id: number; name?: string | undefined }
  type TargetGenericType<S> = {
    [key in keyof S]: S[key];
  };
  type TargetInstance1 = TargetGenericType<SourceInterface>; // { readonly id: number; name?: string | undefined }
  // 注意：我们只能在类型别名定义中使用 in，如果在接口中使用，则会提示一个 ts(1169) 的错误
  //interface ITargetInterface {
  //  [key in SpecifiedKeys]: any; // ts(1169)
  //}



  type TargetGenericTypeReadonly<S> = {
    readonly [key in keyof S]: S[key];
  }
  type TargetGenericTypeReadonlyInstance = TargetGenericTypeReadonly<SourceInterface>; 
  // { readonly id: number; readonly name?: string | undefined }
  type TargetGenericTypeOptional<S> = {
    [key in keyof S]?: S[key];
  }
  type TargetGenericTypeOptionalInstance = TargetGenericTypeOptional<SourceInterface>; 
  // { readonly id?: number; name?: string }

  // -readonly 移除了只读修饰符
  type TargetGenericTypeRemoveReadonly<S> = {
    -readonly [key in keyof S]: S[key];
  }
  type TargetGenericTypeRemoveReadonlyInstance = TargetGenericTypeRemoveReadonly<SourceInterface>; 
  // { id: number; name?: string }

  type TargetGenericTypeRemoveOptional<S> = {
    [key in keyof S]-?: S[key];
  }
  type TargetGenericTypeRemoveOptionalInstance = TargetGenericTypeRemoveOptional<SourceInterface>; 
  // { readonly id: number; name: string }


  // 使用 as 重新映射 key, 自 TypeScript 4.1 起，我们可以在映射类型的索引签名中使用类型断言
  type TargetGenericTypeAssertiony<S> = {
    [key in keyof S as Exclude<key, 'id'>]: S[key];
  }
  type TargetGenericTypeAssertionyInstance = TargetGenericTypeAssertiony<SourceInterface>; 
  // { name?: string; }

  // Merge
  type Merge<A, B> = {
    [key in keyof A | keyof B]: key extends keyof A
      ? key extends keyof B
        ? A[key] | B[key]
        : A[key]
      : key extends keyof B
      ? B[key]
      : never;
  };
  type Merged = Merge<{ id: number; name: string }, { id: string; age: number }>;
  // { id: string | number; name: string; age: number; }


  // Equal
  
}
