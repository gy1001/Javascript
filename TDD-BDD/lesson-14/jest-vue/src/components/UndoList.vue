<template>
  <div>
    <div data-test="count">{{ list.length }}</div>
    <ul>
      <li data-test="item" v-for="(item, index) in list" :key="item">
        {{ item }}
        <span data-test="delete" @click="handleDelete(index)">X</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'undo-list',
  props: {
    list: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    handleDelete(index) {
      this.$emit('delete', index)
    },
  },
}
</script>
<style scoped lang="stylus"></style>
