import { defineComponent, h } from '@vue/runtime-core'
import Circle from './component/Circle'
import StartPage from './page/StartPage'
export default defineComponent({
  render() {
    // 创建vnode
    // <rect  x=100 y=100 >我的头发是真的！！</rect>
    // const vnode = h('rect', { x: 100, y: 100 }, '我的头发是真的！！')
    //return h('rect', { x: 100, y: 100 }, '我的头发是真的！！')
    //return h('rect', { x: 100, y: 100 }, [
    //  '我的头发是真的！！',
    //  h('circle', { x: 150, y: 150 }),
    //  h(Circle),
    //])

    return h('Container', [h(StartPage)])
  },
})
