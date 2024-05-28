import { h, ref } from '../../lib/guide-mini-vue.esm.js'
// import ArrayToText from './ArrayToText.js'
// import TextToText from './TextToText.js'
// import TextToArray from './TextToArray.js'
import ArrayToArray from './ArrayToArray.js'

export default {
  name: 'App',
  setup() {
    return {}
  },
  render() {
    return h('div', { tId: 1 }, [
      h('p', {}, '主页'),
      // old 是 array new 是 text
      // h(ArrayToText),
      // h(TextToText),
      // h(TextToArray),
      h(ArrayToArray),
    ])
  },
}
