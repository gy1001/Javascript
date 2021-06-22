import { observe } from "./observe"

var obj = {
  a: {
    m:{
      n: 5
    }
  },
  g: [22,33,44,55]
}
observe(obj)
obj.g.push(66)
console.log(obj)