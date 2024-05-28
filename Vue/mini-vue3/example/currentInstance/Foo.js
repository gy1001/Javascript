import {
  h,
  renderSlots,
  getCurrentInstance,
} from '../../lib/guide-mini-vue.esm.js'
export const Foo = {
  setup(props, { emit }) {
    const instance = getCurrentInstance()
    console.log('Foo', instance)
    return {
      count: 23333,
    }
  },
  render() {
    return h(
      'div',
      {
        class: 'div1',
      },
      'foo',
    )
  },
}
