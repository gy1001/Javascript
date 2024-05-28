import { ref, h } from '../../lib/guide-mini-vue.esm.js'
const prevChildren = 'previousChildren'
const nextChildren = 'nextChildren'

export default {
  name: 'TextToText',
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
