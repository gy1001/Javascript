import nestToken from './nestToken'
import Scanner from "./Scanner.js"
export default function parseTemplateToTokens(templateStr){
  // 创建扫描器
    var scanner = new Scanner(templateStr)

    var tokens = []
    var word=""
    while(!scanner.eos()){
       word = scanner.scanUtil("{{")
      word && tokens.push(['text', word])
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