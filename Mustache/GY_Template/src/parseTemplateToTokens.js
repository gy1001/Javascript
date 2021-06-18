import nestToken from './nestToken'
import Scanner from "./Scanner.js"
export default function parseTemplateToTokens(templateStr){
  // 创建扫描器
    var scanner = new Scanner(templateStr)
    var tokens = []
    var word=""
    while(!scanner.eos()){
      word = scanner.scanUtil("{{")
      // 这里可以判断处理一下 空格问题，需要判断处理，例如 <li class="red">这里的空格就不能做处理
      // 增加判断：空格是在 标签中的空格还是 标签间的空格
      if(word){
        let _word=""
        let isInnerTag = false
        for (let index = 0; index < word.length; index++) {
          const element = word[index];
          if(element === "<"){
            isInnerTag = true
          }else if(element === ">"){
            isInnerTag = false
          }
          // 如果当前element 是空格，只有在 isInnerTag 为 true 时候才能加
          if(/\s/.test(element)){
            if(isInnerTag){
              _word += element
            }
          }else{
            _word += element
          }
        }
        tokens.push(['text', _word])
      }
      scanner.scan("{{")
      word = scanner.scanUtil("}}")
      if(word){
        if(word[0] === "#"){
          // 存起来，从下标为1的项开始存取，因为下标为0的项是#
          tokens.push(['#', word.substr(1)])
        }else if(word[0] === "/"){
          tokens.push(['/', word.substr(1)])
        }else{          
          tokens.push(['name', word])
        }
      } 
      scanner.scan("}}")
    }
    return nestToken(tokens)
}