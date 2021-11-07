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
  Select,
  ConfigProvider,
  Table,
  Popconfirm,
  DatePicker,
} from 'ant-design-vue'
import VueHeighLightJs from 'vue-highlightjs'
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
Vue.use(Select)
Vue.use(ConfigProvider)
Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(DatePicker)
Vue.use(VueHeighLightJs)
import 'highlight.js/styles/monokai.css'
//import 'highlight.js/styles/github.css'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2318519_r587004hai.js', // 在 iconfont.cn 上生成
})

Vue.component('icon-font', IconFont)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
