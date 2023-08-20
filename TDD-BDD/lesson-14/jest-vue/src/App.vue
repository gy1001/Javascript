<template>
  <div id="app">
    <TodoList />
  </div>
</template>

<script>
import TodoList from './container/TodoList/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList,
  },
}
</script>

<style lang="stylus">
*{
  margin: 0;
  padding: 0;
}
body{
  background-color: #cdcdcd;
}
</style>
