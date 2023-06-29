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
    console.log('子组件2————beforeCreate...')
  },
  created() {
    console.log('子组件2————create...')
  },
  beforeMount() {
    console.log('子组件2————beforeMount...')
  },
  mounted() {
    console.log('子组件2————mounted...')
  },
  beforeUpdate() {
    console.log('子组件2————beforeUpdate...')
  },
  updated() {
    console.log('子组件2————updated...')
  },
  beforeDestroy() {
    console.log('子组件2————beforeDestroy...')
  },
  destroyed() {
    console.log('子组件2————destroyed...')
  },
}
</script>

<style></style>
