interface DogInterface{
  run():void
}
interface CatInterface{
  jump():void
}

// 交叉类型
let pet :DogInterface & CatInterface = {
  run(){
    console.log("run")
  },
  jump(){
    console.log("jump")
  }
}


// 联合类型:
let a11: number | string = 1
a11 = "hello"
// 字面量型联合类型
let b11 : "a" | "b" | "c"
let c11 : 1 | 2 | 3

class Dog implements DogInterface{
  run(){}
  eat(){}
}

class Cat implements CatInterface{
  jump(){}
  eat(){}
}

enum Master{Boy,Girl}

function getPet(master:Master){
  let pet = master == Master.Boy ? new Dog() : new Cat()
  // 从这个方面看，调用的是交集的方法
  pet.eat()
  return pet
}

//
interface Square{
  kind: 'square',
  size: number
}

interface Rectangle{
  kind: 'rectangle',
  width: number,
  height: number
}
type Shape= Square | Rectangle
function area(s:Shape){
  switch(s.kind){
    case "square": 
      return s.size * s.size
    case "rectangle":
      return s.height * s.width 
  }
}