import parseAttrs from "./parseAttrs"
export default function parse(templateString){
  // 指针
  var index = 0
  // 剩余部分
  var rest = ""
  // 开始标记
  var startRegexp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/
  // 结束标记
  var endRegexp = /^\<\/([a-z]+[1-6]?)\>/
  // 抓取结束标签前的文字
  var wordRegexp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/
  // 准备两个栈
  var stack1 = []
  var stack2 = [] 

  while(index < templateString.length - 1){
    rest = templateString.substring(index)
    // 识别遍历到的这个字符，是不是一个开始标签
    if(startRegexp.test(rest)){
      let tag = rest.match(startRegexp)[1]
      let attrStr = rest.match(startRegexp)[2] || ""
      console.log("检测到开始标记", tag)
      console.log("检测到属性文本", attrStr)
      // 将开始标签推入栈1中
      stack1.push(tag)
      // 将空数组推入栈2中
      stack2.push({ tag, children: [], attrs: parseAttrs(attrStr) })
      // 为什么加2，因为<>占了来个那个位
      index += tag.length + 2 + attrStr.length
    }else if(endRegexp.test(rest)){
      // 因为又加了一个/的长度
      let tag = rest.match(endRegexp)[1]
      console.log("检测到结束标记", tag)
      // 遇到结束标签需要弹栈，此时tag 一定是和 栈1 的顶部是相同的，
      let pop_tag = stack1.pop()
      if(tag === pop_tag){
        // 这里最后一项不弹栈
        if(stack2.length > 1){
          let pop_arr = stack2.pop()
          stack2[stack2.length - 1].children.push(pop_arr)
        }
      }else{
        throw new Error(`标签${tag}没有对应封闭标签`)
      }
      index += tag.length + 3
    }else if(wordRegexp.test(rest)) {
      let word = rest.match(wordRegexp)[1]
      if(!/\s+$/.test(word)){
        console.log("检测到文字",word)
        // 检测到文字，需要把文字改变到 stack2 中的栈顶元素中
        stack2[stack2.length - 1].text = word
        stack2[stack2.length - 1].type = 3
        index += word.length
      }else{
        console.warn("检测到空文本, 跳过")
        index++
      }
    }else{
      index++
    }
  }
  return stack2[0]
}