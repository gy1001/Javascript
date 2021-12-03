import { defineComponent, h } from '@vue/runtime-core'
import mapImage from '../assets/map.jpg'
export default defineComponent({
  render() {
    // 背景图片
    return h('Container', [h('Sprite', { texture: mapImage })])
  },
})
