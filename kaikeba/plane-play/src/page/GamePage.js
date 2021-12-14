import { defineComponent, h, reactive } from '@vue/runtime-core'
import Map from '../component/Map'
import Plane from '../component/Plane'

function useCreatePlane() {
  const planeInfo = reactive({
    x: 200,
    y: 700,
  })
  const speed = 30
  window.addEventListener('keydown', e => {
    switch (e.code) {
      case 'ArrowUp':
        planeInfo.y -= speed
        break
      case 'ArrowDown':
        planeInfo.y += speed
        break
      case 'ArrowLeft':
        planeInfo.x -= speed
        break
      case 'ArrowRight':
        planeInfo.x += speed
        break
      default:
        break
    }
  })
  return { planeInfo }
}

export default defineComponent({
  setup() {
    const { planeInfo } = useCreatePlane()

    return {
      planeInfo,
    }
  },
  render(ctx) {
    // 背景图片
    return h('Container', [
      h(Map),
      h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y }),
    ])
  },
})
