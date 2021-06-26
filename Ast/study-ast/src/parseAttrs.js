// 把 attrsStr 处理称数组 [{name:'',value:''},...]
export default function parseAttrs(attrStr){
  if(!attrStr){
    return []
  }
  // 当前是否在引号内
  let isInnerYinHao = false
  // 指针
  let point = 0
  // 结果
  let result = []

  // attrStr 是类似于这样的形式：class="mine aa bb cc" id="his"
  // 这里不能用split 分离，因为空格有可能在 "" 内部
  for (let index = 0; index < attrStr.length; index++) {
    const char = attrStr[index];
    if(char === '"'){
      isInnerYinHao = !isInnerYinHao
    }else if(char == ' ' && !isInnerYinHao){
      // 当前是空格，并且不再 "" 内部
      console.log(point, index)
      const currentAttr = attrStr.substring(point, index).trim()
      if(currentAttr){
        result.push(deliverAttr(currentAttr))
      }
      point = index
    }
  }
  // 循环结束以后还剩一属性
  // 按照 <h3 class="mine aa bb cc" id="his">你好</h3> 这个例子会发现还有一个id 没有加入到result中
  // 但是这样 <h3 class="mine aa bb cc" id="his" >你好</h3>这样就会加入，结束标签前加了一个空格，走了上面的 else 判断
  // 所以还需要做一个处理，处理结束标签前没有空格的情况
  const endAttr = attrStr.substring(point).trim() 
  if(endAttr){
    result.push(deliverAttr(endAttr))
  }
  return result
}

function deliverAttr(singAttr){
  const attrRegexp = /^(.+)=(.+)$/
  const matchArr = singAttr.match(attrRegexp)
  return {
    name: matchArr[1],
    value: matchArr[2]
  }
}
