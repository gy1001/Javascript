<template>
  <div>
    <TodoHeader @add="addItem"></TodoHeader>
    {{ undoList }}
  </div>
</template>

<script>
import TodoHeader from '@/components/Header.vue'
export default {
  name: 'todo-list',
  components: {
    TodoHeader,
  },
  data() {
    return {
      undoList: [],
    }
  },
  methods: {
    addItem(value) {
      this.undoList.push(value)
    },
  },
}
</script>

<style lang="stylus" scoped></style>
