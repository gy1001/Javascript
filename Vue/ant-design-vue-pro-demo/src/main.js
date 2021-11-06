import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Authority from './components/Authorized.vue'
Vue.component('my-authority', Authority)
//import Button from 'ant-design-vue/lib/button'
//import 'ant-design-vue/lib/button/style'
import {
  Button,
  Result,
  Layout,
  Breadcrumb,
  Menu,
  Icon,
  Drawer,
  Radio,
  Form,
  Input,
} from 'ant-design-vue'
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Result)
Vue.use(Layout)
Vue.use(Breadcrumb)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Form)
Vue.use(Input)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
