/// reference path="a.ts"
namespace Shape{
  export function square(x:number){
    return x ** 2
  }
}

// 访问命名空间
Shape.circle(1)
Shape.square(2)