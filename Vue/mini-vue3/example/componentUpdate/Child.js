import { h, ref } from '../../lib/guide-mini-vue.esm.js'

export default {
  setup(props, { emit }) {
    return {}
  },
  render() {
    return h('div', {}, [
      h('div', {}, 'child - props - msg:' + this.$props.msg),
    ])
  },
}
