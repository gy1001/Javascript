import { observe } from "./observe"

var obj = {
  a: {
    m:{
      n: 5
    }
  }
}
observe(obj)

console.log(obj)