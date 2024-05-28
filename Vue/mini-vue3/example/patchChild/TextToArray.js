import { ref, h } from '../../lib/guide-mini-vue.esm.js'
const prevChildren = 'nextChildren'
const nextChildren = [h('div', {}, 'A'), h('div', {}, 'B')]

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
