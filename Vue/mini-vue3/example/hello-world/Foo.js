import { h } from '../../lib/guide-mini-vue.esm.js'
export const Foo = {
  setup(props, { emit }) {
    // 1. setup 第一个参数是 props
    // 2. props 含有 count,
    // 3. 并且 props 中属性不可变
    props.count++
    const emitAdd = (event) => {
      event.stopPropagation()
      emit('add', 1, 2, 3)
      emit('add-foo', 1, 2, 3)
    }
    return {
      emitAdd,
      count: 23333,
      // count: props.count,
    }
  },
  render() {
    const btn = h(
      'button',
      {
        onClick: this.emitAdd,
      },
      'add 按钮',
    )
    return h(
      'div',
      {
        class: 'div1',
      },
      [h('div', {}, 'foo: ' + this.count), btn],
    )
  },
}
