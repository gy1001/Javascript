
```flow
st=>start: patch 函数被调用: path(oldVNode, newVNode)
e=>end: 完成diff算法
op1=>operation: op1:就将 oldVNode 包装为虚拟节点
cond1=>condition: cond1:oldVNode是否是虚拟节点(否则就是Dom节点)
cond2=>condition: cond2:是不是同一个节点 (sel和key都相同) 
op2=>operation: op2:就进行暴力删除旧的，插入新的,结束
op3=>operation: op3:意味着有children
cond3=>condition: cond3:是不是内存中同一个对象 
cond4=>condition: cond4:newVNode有没有文字text属性
cond5=>condition: cond5:text属性是否相同
op4=>operation: op4:需要把 elm 中的 innerText 改变为 
newVNode 中的 text,
结束(注意：如果oldVNode中的有children属性没有text属性，
一旦更改innerText，老节点的children属性会被删除),结束
op5=>operation: op5:意味着有children
cond6=>condition: cond6:oldValue 中有没有 children
op6=>operation: op6:意味着oldVNode中有text,
需要做1：清空oldVNode中的text,
然后2：把 newVNode 中的 children 属性 添加到 DOM 中
结束
op7=>operation: op7:这里意味着 newVNode oldVNode 都有 children 属性, 要进行最优雅的 diff 算法

op8=>operation: op8:是同一个节点，结束end
op9=>operation: 什么就不做，结束
op10=>operation: 结束
st->cond1
cond1(yes)->cond2
cond1(no)->op1->cond2

cond2(yes)->cond3
cond2(no)->op2

cond3(no)->cond4
cond3(yes)->op8

cond4(yes)->cond5
cond4(no)->op5->cond6

cond5(yes)->op9
cond5(no)->op4->op10

cond6(no)->op6
cond6(yes)->op7->e

```