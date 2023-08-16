// const { add, minus }  = require("./math")
import { add, minus } from './math'
test("测试加法 3 + 7", ()=>{
  expect(add(3, 7)).toBe(10)
})

test("测试减法 6 - 3", ()=>{
  expect(minus(6, 3)).toBe(3)
})
