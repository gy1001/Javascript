import addDivToBody from "./demo"
import $ from "jquery"
var jsdom = require("jsdom");
var window = jsdom.jsdom().defaultView;
test("测试 addDivToBody", () => {
  addDivToBody()
  expect($('body').find("div").length).toBe(1)
  addDivToBody()
  expect($('body').find("div").length).toBe(2)
})