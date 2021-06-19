
import h from "./mySnabbDom/h"
import patch from "./mySnabbDom/patch"

var myNode1 = h("li", {}, "栗子")
//myNode1 = h("ul",{}, [
//  h("li",{},"栗子"),
//  h("li",{},"葡萄"),
//  h("li",{},"香蕉"),
//  h("li",{}, [h("h2", {}, "我是不带[]进来的")]),
//  //h("li",{},  h("h3", {}, "我是唯一的子元素") ),
//])

const container = document.getElementById('container')
patch(container, myNode1)

document.getElementById("btn").addEventListener("click", function(){
  var myNode = h("li",{}, [
    h("div",{},"新的栗子"),
    h("div",{},"新葡萄"),
    h("div",{},"新香蕉"),
    h("p",{}, [h("li", {}, "新的我是不带[]进来的")]),
  ])
  //var myNode = h("ul",{}, "文本节点")
  patch(myNode1, myNode)
})