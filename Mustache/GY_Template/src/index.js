import parseTemplateToTokens from './parseTemplateToTokens.js'
window.SSG_TemplateEngine = {
  render(templateStr, data){
    // 
    var tokens =  parseTemplateToTokens(templateStr)
    console.log('最后的结果',tokens)
  } 
}