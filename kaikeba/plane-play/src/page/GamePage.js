import { defineComponent, h } from '@vue/runtime-core'
import Map from '../component/Map'
export default defineComponent({
  render() {
    // 背景图片
    return h('Container', [h(Map)])
  },
})
