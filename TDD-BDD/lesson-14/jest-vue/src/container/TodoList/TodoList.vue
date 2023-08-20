<template>
  <div>
    <TodoHeader @add="addItem"></TodoHeader>
    <UndoList :list="undoList" @delete="deleteItem"></UndoList>
  </div>
</template>

<script>
import TodoHeader from '@/components/Header.vue'
import UndoList from '@/components/UndoList.vue'
export default {
  name: 'todo-list',
  components: {
    TodoHeader,
    UndoList,
  },
  data() {
    return {
      undoList: [],
    }
  },
  methods: {
    addItem(value) {
      this.undoList.push({ value, status: 'div' })
    },
    deleteItem(index) {
      this.undoList.splice(index, 1)
    },
  },
}
</script>

<style lang="stylus" scoped></style>
