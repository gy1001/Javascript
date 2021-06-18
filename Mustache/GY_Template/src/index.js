import parseTemplateToTokens from './parseTemplateToTokens.js'
import renderTemplate from './renderTemplate.js'
window.SSG_TemplateEngine = {
  render(templateStr, data){
    var tokens =  parseTemplateToTokens(templateStr)
    // 调用 renderTemplate 函数，让tokens 数组变成 dom 字符串
    var domStr = renderTemplate(tokens, data)
    console.log(domStr)
  } 
}