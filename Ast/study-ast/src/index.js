import parse from "./parse"

var templateStr = `
  <div>
    <h3>你好</h3>
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
  </div>
`
var templateStr1 = `
  <div>
    <h3>你好</h3>
    哈哈哈哈哈哈
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
  </div>
`
// 暂时不处理 templateStr1 中 类似文字“哈哈哈”在结束标签后，开始标签前的内容
// 还有一些自闭合性标签 <input /> 等情况
var result = parse(templateStr)
console.log(result)