<template>
  <div>{{ text }}</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    text: {
      type: String,
    },
  },
  beforeCreate() {
    console.log('子组件1————beforeCreate...')
  },
  created() {
    console.log('子组件1————create...')
  },
  beforeMount() {
    console.log('子组件1————beforeMount...')
  },
  mounted() {
    console.log('子组件1————mounted...')
  },
  beforeUpdate() {
    console.log('子组件1————beforeUpdate...')
  },
  updated() {
    console.log('子组件1————updated...')
  },
  beforeDestroy() {
    console.log('子组件1————beforeDestroy...')
  },
  destroyed() {
    console.log('子组件1————destroyed...')
  },
}
</script>

<style></style>
