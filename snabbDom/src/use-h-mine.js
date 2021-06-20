
import h from "./mySnabbDom/h"
import patch from "./mySnabbDom/patch"
//var myNode1 = h("li", {}, "栗子")
var myNode1 = h("ul",{}, [
  h("li",{key:'A'},"栗子"),
  h("li",{key:'B'},"葡萄"),
  h("li",{key:'C'},"香蕉"),
  h("li",{key:'D'}, [h("h2", {}, "我是不带[]进来的")]),
  //h("li",{},  h("h3", {}, "我是唯一的子元素") ),
])

const container = document.getElementById('container')
patch(container, myNode1)

document.getElementById("btn").addEventListener("click", function(){
  var myNode = h("ul",{}, [
    h("li", {key:'A'},"栗子"),
    h("li", {key:'B'},"葡萄"),
    h("li", {key:'C'},"香蕉"),
    h("li", {key:'E'},"香蕉的EEEEE"),
    h("li", {key:'F'},"FFFFFFFF"),
    h("li", {key:'D'}, [h("h2", {}, "我是不带[]进来的")]),
  ])
  //var myNode = h("ul",{}, "文本节点")
  patch(myNode1, myNode)
})