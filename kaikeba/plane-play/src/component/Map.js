import { defineComponent, h, ref } from '@vue/runtime-core'
import mapImage from '../assets/map.jpg'
import { game } from '../Game'
export default defineComponent({
  // setup 作为vue3的入口函数
  setup(props, ctx) {
    const viewHeight = 1000
    const mapY1 = ref(0)
    const mapY2 = ref(-viewHeight)
    // pixi.js
    const speed = 5
    game.ticker.add(() => {
      mapY1.value += speed
      mapY2.value += speed
      if (mapY1.value >= viewHeight) {
        mapY1.value = -viewHeight
      }
      if (mapY2.value >= viewHeight) {
        mapY2.value = -viewHeight
      }
    })

    return {
      mapY1,
      mapY2,
    }
  },

  render(ctx) {
    // 背景图片
    return h('Container', [
      h('Sprite', { texture: mapImage, y: ctx.mapY1 }),
      h('Sprite', { texture: mapImage, y: ctx.mapY2 }),
    ])
  },
})
