import MiniVue from "../src/gy-vue/other-vue/index"
//import MiniVue from "../src/gy-vue/index"

new MiniVue({
  el: '#app',
  data(){
    return {
      msg: '我是被替换的msg'
    }
  },
  components: {
    'a-b': '<div>1111</div>'
  }
})