
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
  h("li",{key:1},[
    h("h1","我又来来")
  ]),
  h("li",{key:3},"栗子"), // 在生成的页面中修改此行 内容 栗子 为==“丑八怪”，点击后，发现这里没有发生变化，说明页面此处没有处理，是最小更新
  // 当然如果前面有新增元素时候会发现发生变化了 ，因为这里没有加key
  // 加上key以后就会发生没有变化
  h("li",{key:4},"葡萄"),
  h("li",{key:5},"香蕉"),
  h("li",{key:6},h("h2","我是不带[]进来的")),
])

 // 让虚拟节点上树
 var container = document.getElementById("container")
 patch(container, myNode4)


 document.getElementById('btn').addEventListener('click', function(){
  const myNode5 = h('ul',"我是副元素",[
    h("li",{key:1}, [
      h("h1","我又来来")
    ]),
    h("li",{key:2},"我是新加的"), 
    h("li",{key:3},"栗子"), 
    h("li",{key:4},"葡萄"),
    h("li",{key:5},"香蕉"),
    h("li",{key:6},h("h2","我是不带[]进来的")),
    h("li",{key:7},h("h2","我是不带[]进来的")),
    h("li",{key:8},h("h2","我是不带[]进来的")),
    h("li",{key:9},h("h2","我是不带[]进来的")),
    h("li",{key:10},h("h2","我是不带[]进来的")),
    h("li",{key:11},h("h2","我是不带[]进来的")),
    h("li",{key:12},h("h2","我是不带[]进来的")),
    h("li",{key:13},h("h2","我是不带[]进来的")),
  ])
   patch(myNode4, myNode5) 
 })