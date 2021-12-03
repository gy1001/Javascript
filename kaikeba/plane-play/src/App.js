import { defineComponent, h, computed, ref } from '@vue/runtime-core'
import Circle from './component/Circle'
import StartPage from './page/StartPage'
import GamePage from './page/GamePage'
export default defineComponent({
  setup(props, ctx) {
    // 改变string 来切换组件
    // ref: 创建一个响应式数据，一般用来包裹  值类型
    const currentPageName = ref('StartPage') // 需要变为响应式
    // 计算属性，更改字符串的话来更改组件
    const currentPage = computed(() => {
      return currentPageName.value === 'StartPage' ? StartPage : GamePage
    })
    return {
      currentPageName,
      currentPage,
    }
  },

  render(ctx) {
    // 创建vnode
    // <rect  x=100 y=100 >我的头发是真的！！</rect>
    // const vnode = h('rect', { x: 100, y: 100 }, '我的头发是真的！！')
    //return h('rect', { x: 100, y: 100 }, '我的头发是真的！！')
    //return h('rect', { x: 100, y: 100 }, [
    //  '我的头发是真的！！',
    //  h('circle', { x: 150, y: 150 }),
    //  h(Circle),
    //])

    return h('Container', [
      h(ctx.currentPage, {
        onChangePage(page) {
          console.log(page)
          ctx.currentPageName = page
        },
      }),
    ])
  },
})
