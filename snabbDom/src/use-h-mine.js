
import h from "./mySnabbDom/h"
import patch from "./mySnabbDom/patch"
//var myNode1 = h("li", {}, "栗子")
var myNode1 = h("ul",{}, [
  h("li",{key:'A'},"A"),
  h("li",{key:'B'},"B"),
  h("li",{key:'C'},"C"),
  h("li",{key:'D'},"D"),
  h("li",{key:'E'},"E"),
])

const container = document.getElementById('container')
patch(container, myNode1)

document.getElementById("btn").addEventListener("click", function(){
  var myNode = h("ul",{}, [
    h("li",{key:'Q'},"Q"),
    h("li",{key:'A'},"A"),
    h("li",{key:'B'},"B"),
    h("li",{key:'C'},"C"),
    h("li",{key:'D'},"D"),
    h("li",{key:'E'},"E"),
  ])
  //var myNode = h("ul",{}, "文本节点")
  patch(myNode1, myNode)
})