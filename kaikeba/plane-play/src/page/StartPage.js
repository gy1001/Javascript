import { defineComponent, h } from '@vue/runtime-core'
import startPageImage from '../assets/start_page.jpg'
import startBtnImage from '../assets/startBtn.png'
export default defineComponent({
  render() {
    // 背景图片
    return h('Container', [
      h('Sprite', { texture: startPageImage }),
      h('Sprite', { texture: startBtnImage, x: 225, y: 513 }),
    ])
  },
})
