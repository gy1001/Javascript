import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'

export const App = {
  name: 'App',
  render() {
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
        onClick() {
          console.log('clicked')
        },
      },
      // string
      // 'hi, ' + this.msg,
      // array
      [
        h('p', { class: 'red' }, 'hi'),
        h('p', { class: 'blue' }, 'mini-vue'),
        h(Foo, {
          count: 1,
          onAdd(a, b, c) {
            console.log('app onAdd', a, b, c)
          },
          // add-foo => addFoo
          onAddFoo(a, b, c) {
            console.log('app onAddFor', a, b, c)
          },
        }),
      ],
    )
  },
  setup() {
    return {
      msg: 'mini-vue-haha',
    }
  },
}
