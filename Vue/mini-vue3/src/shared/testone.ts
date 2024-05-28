const ShapeFlags = {
  element: 0,
  stateful_component: 0,
  text_children: 0,
  array_children: 0,
}

//
// 位运算更高效
// 0000
// 0001 -> element
// 0010 -> stateful_component
// 0100 -> text_children
// 1000 -> array_children

// 1010 ->  array_children + stateful_component

// 注意 |或 与 &并 运算
// 0000 想修改为 0001
// 0000 | 0001 = 0001

// 查找 使用 &
// 0001 & 0001 = 0001
// 0010 & 0001 = 0000
