import { defineComponent, h, ref, toRefs } from '@vue/runtime-core'
import planeImage from '../assets/plane.png'
export default defineComponent({
  // setup 作为vue3的入口函数
  setup(props, ctx) {
    console.log('props', props)
    const { x, y } = toRefs(props)
    return {
      x: x,
      y: y,
    }
  },

  render(ctx) {
    // 背景图片
    return h(
      'Container',
      {
        x: ctx.x,
        y: ctx.y,
      },
      [h('Sprite', { texture: planeImage })]
    )
  },
})
