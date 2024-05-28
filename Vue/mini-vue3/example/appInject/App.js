import { h, provide, inject } from '../../lib/guide-mini-vue.esm.js'

const Provide = {
  name: 'Provider',
  setup() {
    provide('foo', 'fooVal')
    provide('bar', 'barVal')
  },
  render() {
    return h('div', {}, [h('p', {}, 'Provider'), h(ProvideTwo)])
  },
}

const ProvideTwo = {
  name: 'Provider',
  setup() {
    provide('foo', 'fooTwoVal')
    const foo = inject('foo')
    return {
      foo,
    }
  },
  render() {
    return h('div', {}, [h('p', {}, 'ProviderTwo--' + this.foo), h(Consumer)])
  },
}

const Consumer = {
  name: 'Consumer',
  setup() {
    const foo = inject('foo')
    const bar = inject('bar')
    const baz = inject('baz', 'default-baz')
    const bazFnc = inject('baz', () => 'default-baz')
    return {
      foo,
      bar,
      baz,
      bazFnc,
    }
  },
  render() {
    return h(
      'div',
      {},
      `Consumer: - ${this.foo} - ${this.bar} - ${this.baz} - ${this.bazFnc}`,
    )
  },
}

export default {
  name: 'App',
  setup() {
    return {}
  },
  render() {
    return h('div', {}, [h('p', {}, 'appInject'), h(Provide)]) // 渲染App组件，App组件内部包含Provider组件
  },
}
