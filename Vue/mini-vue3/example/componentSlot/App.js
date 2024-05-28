import { h, createTextVNode } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'

export const App = {
  name: 'App',
  render() {
    const app = h('div', {}, 'App')
    // const foo = h(Foo, {}, [h('p', {}, '123'), h('p', {}, '456')])
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => [
          h('p', {}, 'header-123' + age),
          createTextVNode('你好啊'),
        ],
        default: () => h('p', {}, 'default-456'),
        footer: () => h('p', {}, 'footer-789'),
      },
    )
    return h(
      'div',
      {
        id: 'root',
      },
      [app, foo],
    )
  },
  setup() {
    return {
      msg: 'mini-vue-haha',
    }
  },
}
