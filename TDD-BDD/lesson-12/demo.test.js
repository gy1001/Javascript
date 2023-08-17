// jest.mock("./util")
// // jest.mock 发现 util 是一个类，会自动把类的构造函数和方法变成 jest.fn()
// // const Util = jest.fn()
// // Util.a = jest.fn()
// // Util.b = jest.fn()
// // Util.init = jest.fn()
// import demoFunction from "./demo";
// import Util from "./util"
// test("测试 demoFunction", () => {
//   demoFunction(1,2)
//   expect(Util).toHaveBeenCalled()
//   expect(Util.mock.instances[0].a).toHaveBeenCalled()
//   expect(Util.mock.instances[0].b).toHaveBeenCalled()
// })


jest.mock("./util", () =>{
  const Util = jest.fn()
  Util.prototype.a = jest.fn(() => {
    console.log("__a")
  })
  Util.prototype.b = jest.fn(() => {
    console.log("__b")
  })
  return Util
})
import demoFunction from "./demo";
import Util from "./util"
test("测试 demoFunction", () => {
  demoFunction(1,2)
  expect(Util).toHaveBeenCalled()
  expect(Util.mock.instances[0].a).toHaveBeenCalled()
  expect(Util.mock.instances[0].b).toHaveBeenCalled()
})