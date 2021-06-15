// 由真正的 DOM 去生成虚拟 DOM: 将这个函数当做compiler函数
function getNode(node){
  let nodeType = node.nodeType
  let _vnode = null
  if(nodeType === 1){
    // 元素
    let nodeName = node.nodeName
    let attrs = node.attributes // 伪数组
    let attrsObj = {}
    for (let index = 0; index < attrs.length; index++) {
      const element = attrs[index]; // 这里是属性节点
      attrsObj[element.nodeName] = element.nodeValue
    }
    _vnode = new VNode(nodeName,attrsObj,undefined,nodeType)
    // 考虑node 的子元素
    let childNodes = node.childNodes;
    for (let index = 0; index < childNodes.length; index++) {
      const element = childNodes[index];
      _vnode.addNode(getNode(element))
    }
  }else{
    // 文本节点
    _vnode = new VNode(undefined, undefined, node.nodeValue,nodeType)
  } 
  return _vnode
}


// 将虚拟 DOM 转换成真正的 DOM
function parseVNode(vNode){
    // 创建真实的DOM
  let type = vNode.type
  let _node = null
  if(type === 3){
    return document.createTextNode(vNode.value) // 创建文本节点
  }else{
    _node = document.createElement(vNode.tag)
    // 属性
    var data = vNode.data // 现在是一种键值对的形式
    Object.keys(data).forEach(key => {
      let attrName = key
      let attrValue = data[key]
      _node.setAttribute(attrName, attrValue)
    })
    // 子元素
    let childNodes = vNode.childNodes
    childNodes.forEach(subVNode => {
      _node.appendChild(parseVNode(subVNode)) // 递归转换子元素（虚拟DOM）
    })
    return _node
  } 
}

let regexpKuoHao = /\{\{(.+?)\}\}/g

// 将带有数据的VNode 和数据data结合，得到填充数据的 VNode 的数据 ：模拟AST->VNode
function combine(vNode,data){
  let _type = vNode.type
  let _data = vNode.data
  let _tag = vNode.tag
  let _value = vNode.value
  let _children = vNode.childNodes
  let _vNode = null
  if(_type === 3){
    // 文本节点
    // 对文本进行处理
    _value = _value.replace(regexpKuoHao, (_,g)=>{
      return getValueByPath(data, g.trim())
    })
    _vNode = new VNode(_tag, _data,_value,_type)
  }else if(_type === 1){
    // 元素节点
    _vNode = new VNode(_tag,_data,_value,_type)
    _children.forEach(subVNode => {
      _vNode.addNode(combine(subVNode, data))
    })
  }
  return _vNode
}

// 根据路径 访问对象成员
function getValueByPath(obj, key){
  const keys = key.split('.')
  return keys.reduce((currentValue, nextKey) => {
    return currentValue[nextKey]
  }, obj)
}
