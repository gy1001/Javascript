import Util from "./util"
let util = null
beforeAll(() => {
  util = new Util()
})
test("测试 util 的 a 函数", () => {
  util.a()
})

test("测试 util 的 b 函数", () => {
  util.b()
})