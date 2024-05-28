import { ref, h } from '../../lib/guide-mini-vue.esm.js'
// 1. 左侧的对比
// （a,b） c
// （a,b） d e
// const prevChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C' }, 'C'),
// ]
// const nextChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'D' }, 'D'),
//   h('div', { key: 'E' }, 'E'),
// ]

// 2. 右侧的对比

// const prevChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C' }, 'C'),
// ]
// const nextChildren = [
//   h('div', { key: 'D' }, 'D'),
//   h('div', { key: 'E' }, 'E'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C' }, 'C'),
// ]

// 3.新的比老的长
// 右侧多出来
// const prevChildren = [h('div', { key: 'A' }, 'A'), h('div', { key: 'B' }, 'B')]

// const nextChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C' }, 'C'),
//   h('div', { key: 'D' }, 'D'),
// ]
// 4.新的比老的长
// 左侧多出来
// const prevChildren = [h('div', { key: 'A' }, 'A'), h('div', { key: 'B' }, 'B')]

// const nextChildren = [
//   h('div', { key: 'D' }, 'D'),
//   h('div', { key: 'C' }, 'C'),
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
// ]

// 5. 老的比新的长， 老的右侧多
// const prevChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C' }, 'C'),
//   h('div', { key: 'D' }, 'D'),
// ]

// const nextChildren = [h('div', { key: 'A' }, 'A'), h('div', { key: 'B' }, 'B')]
// 6. 老的比新的长，老的左侧多
// const prevChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C' }, 'C'),
//   h('div', { key: 'D' }, 'D'),
// ]

// const nextChildren = [h('div', { key: 'C' }, 'C'), h('div', { key: 'D' }, 'D')]

// 7. 中间变更
// const prevChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C', id: 'prev-c' }, 'C'),
//   h('div', { key: 'D' }, 'D'),
//   h('div', { key: 'F' }, 'F'),
//   h('div', { key: 'G' }, 'G'),
// ]

// const nextChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'E' }, 'E'),
//   h('div', { key: 'C', id: 'next-c' }, 'C'),
//   h('div', { key: 'F' }, 'F'),
//   h('div', { key: 'G' }, 'G'),
// ]

// const prevChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C', id: 'prev-c' }, 'C'),
//   h('div', { key: 'E' }, 'E'),
//   h('div', { key: 'D' }, 'D'),
//   h('div', { key: 'F' }, 'F'),
//   h('div', { key: 'G' }, 'G'),
// ]

// const nextChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'E' }, 'E'),
//   h('div', { key: 'C', id: 'next-c' }, 'C'),
//   h('div', { key: 'F' }, 'F'),
//   h('div', { key: 'G' }, 'G'),
// ]

// 元素移动
// 最长递增子序列：[1,2]
// const prevChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C', id: 'prev-c' }, 'C'),
//   h('div', { key: 'D' }, 'D'),
//   h('div', { key: 'E' }, 'E'),
//   h('div', { key: 'F' }, 'F'),
//   h('div', { key: 'G' }, 'G'),
// ]

// const nextChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'E' }, 'E'),
//   h('div', { key: 'C', id: 'next-c' }, 'C'),
//   h('div', { key: 'D' }, 'D'),
//   h('div', { key: 'F' }, 'F'),
//   h('div', { key: 'G' }, 'G'),
// ]

// 创建新的节点
// const prevChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'C', id: 'prev-c' }, 'C'),
//   h('div', { key: 'E' }, 'E'),
//   h('div', { key: 'F' }, 'F'),
//   h('div', { key: 'G' }, 'G'),
// ]

// const nextChildren = [
//   h('div', { key: 'A' }, 'A'),
//   h('div', { key: 'B' }, 'B'),
//   h('div', { key: 'E' }, 'E'),
//   h('div', { key: 'C', id: 'next-c' }, 'C'),
//   h('div', { key: 'D' }, 'D'),
//   h('div', { key: 'F' }, 'F'),
//   h('div', { key: 'G' }, 'G'),
// ]

// 综合例子
const prevChildren = [
  h('div', { key: 'A' }, 'A'),
  h('div', { key: 'B' }, 'B'),
  h('div', { key: 'C', id: 'prev-c' }, 'C'),
  h('div', { key: 'E' }, 'E'),
  h('div', { key: 'Z' }, 'Z'),
  h('div', { key: 'F' }, 'F'),
  h('div', { key: 'G' }, 'G'),
]

const nextChildren = [
  h('div', { key: 'A' }, 'A'),
  h('div', { key: 'B' }, 'B'),
  h('div', { key: 'D' }, 'D'),
  h('div', { key: 'C', id: 'next-c' }, 'C'),
  h('div', { key: 'Y' }, 'Y'),
  h('div', { key: 'E' }, 'E'),
  h('div', { key: 'F' }, 'F'),
  h('div', { key: 'G' }, 'G'),
]

export default {
  name: 'arrayToText',
  setup() {
    const isChange = ref(false)
    window.isChange = isChange
    return {
      isChange,
    }
  },
  render() {
    return this.isChange
      ? h('div', {}, nextChildren)
      : h('div', {}, prevChildren)
  },
}
