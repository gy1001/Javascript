import { defineComponent, h } from '@vue/runtime-core'
import startPageImage from '../assets/start_page.jpg'
import startBtnImage from '../assets/startBtn.png'
export default defineComponent({
  // setup 作为vue3的入口函数
  setup(props, ctx) {
    // 没有this
    const onClick = () => {
      console.log('点击事件')
      ctx.emit('changePage', 'GamPage')
    }
    return {
      onClick,
    }
  },

  render(ctx) {
    // 背景图片
    return h('Container', [
      h('Sprite', { texture: startPageImage }),
      h('Sprite', {
        texture: startBtnImage,
        x: 225,
        y: 513,
        interactive: true,
        onClick: ctx.onClick,
      }),
    ])
  },
})
