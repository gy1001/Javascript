import { observe } from "./observe"
import Watcher from "./Watcher"
var obj = {
  a: {
    m:{
      n: 5
    }
  },
  g: [22,33,44,55]
}
observe(obj)
obj.g=[22,33,44,55,88]
obj.g.push(999)
new Watcher(obj, "a.m.n", (val ) => {
  console.log('☆☆☆☆',val)
})
obj.a.m.n = 8
console.log(obj)