import { h, renderSlots } from '../../lib/guide-mini-vue.esm.js'
export const Foo = {
  setup(props, { emit }) {
    return {
      count: 23333,
    }
  },
  render() {
    const btn = h('button', {}, 'add 按钮')
    return h(
      'div',
      {
        class: 'div1',
        age: 'Foo.js',
      },
      // renderSlots
      // 具名插槽
      // 1. 获取到所有的插槽内容
      // 2. 要获取到渲染的位置
      // 作用域插槽
      //
      [
        renderSlots(this.$slots, 'header', { age: '--18' }),
        h('div', {}, 'foo: ' + this.count),
        btn,
        renderSlots(this.$slots, 'default'),
        renderSlots(this.$slots, 'footer'),
      ],
    )
  },
}
