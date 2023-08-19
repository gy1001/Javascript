<template>
  <div>
    <TodoHeader></TodoHeader>
  </div>
</template>

<script>
import TodoHeader from '@/components/Header.vue'
export default {
  name: 'todo-list',
  components: {
    TodoHeader,
  },
}
</script>

<style lang="stylus" scoped></style>
