
import h from "./mySnabbDom/h"
import patch from "./mySnabbDom/patch"

var myNode1 = h("li", {}, "栗子")
//myNode1 = h("ul",{}, [
//  h("li",{},"栗子"),
//  h("li",{},"葡萄"),
//  h("li",{},"香蕉"),
//  h("li",{}, [h("h2", {}, "我是不带[]进来的")]),
//  h("li",{},  h("h3", {}, "我是唯一的子元素") ),
//])

const container = document.getElementById('container')
patch(container, myNode1)