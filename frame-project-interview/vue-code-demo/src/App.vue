<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <TplDemo/> -->
    <!-- <ConditionDemo/> -->
    <!-- <EventDemo/> -->

    <!-- <ComponentDemo/> -->

    <!-- <AdvancedUse/> -->

    <CartDemo />
    <index1 text="1"></index1>
    <index2 text="2"></index2>
    <button id="destroy" @click="handle">点击</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

// import TplDemo from './components/BaseUse/TplDemo'
// import ConditionDemo from './components/BaseUse/ConditionDemo'
// import EventDemo from './components/BaseUse/EventDemo'

// import ComponentDemo from './components/ComponentsDemo/index'

// import AdvancedUse from './components/AdvancedUse/index'

import CartDemo from './components/Cart/index'
import index1 from './index1.vue'
import index2 from './index2.vue'
export default {
  name: 'app',
  components: {
    // HelloWorld
    // EventDemo
    // ComponentDemo
    // AdvancedUse
    CartDemo,
    index2,
    index1,
  },
  data() {
    return {
      text: '',
    }
  },
  methods: {
    handle() {
      this.$destroy()
    },
  },
  beforeCreate() {
    console.log('父组件————beforeCreate...')
  },
  created() {
    console.log('父组件————create...')
  },
  beforeMount() {
    console.log('父组件————beforeMount...')
  },
  mounted() {
    console.log('父组件————mounted...')
  },
  beforeUpdate() {
    console.log('父组件————beforeUpdate...')
  },
  updated() {
    console.log('父组件————updated...')
  },
  beforeDestroy() {
    console.log('父组件————beforeDestroy...')
  },
  destroyed() {
    console.log('父组件————destroyed...')
  },
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
