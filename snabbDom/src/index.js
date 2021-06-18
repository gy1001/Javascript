
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// diff 算法核心函数
const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

var myNode = h("a",
  {
    props: {
      href:'http:www.baidu.com',
      target: "_blank"
    }
  },
  '百度一下')
 console.log(myNode)

const myNode2 = h("div", {
  class: { box:'true' },
  props: {}
}, "我是一个空盒子")

const myNode3 = h("div", "我是一个空盒子")

// h 函数也可以进行嵌套
const myNode4 = h('ul',"我是副元素",[
  h("li",[
    h("h1","我又来来")
  ]),
  h("li","栗子"),
  h("li","葡萄"),
  h("li","香蕉"),
  h("li",h("h2","我是不带[]进来的")),
])

 // 让虚拟节点上树
 var container = document.getElementById("container")
 patch(container, myNode4)