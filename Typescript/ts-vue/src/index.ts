import Vue from "vue"
import Hello from "./components/Hello.vue"
let app = new Vue({
  el: ".app",
  components: {
    'hello': Hello
  },
  template: '<hello />'
})
