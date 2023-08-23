<template>
  <div>
    <TodoHeader @add="addItem"></TodoHeader>
    <UndoList
      :list="undoList"
      @delete="deleteItem"
      @change="changItemStatus"
      @reset="resetList"
      @changeValue="changeValue"
    ></UndoList>
  </div>
</template>

<script>
import axios from 'axios'
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
    changItemStatus(index) {
      const newList = []
      this.undoList.forEach((item, itemIndex) => {
        if (index === itemIndex) {
          newList.push({ ...item, status: 'input' })
        } else {
          newList.push({ ...item, status: 'div' })
        }
      })
      this.undoList = newList
    },
    resetList() {
      this.undoList = this.undoList.map((item) => ({ ...item, status: 'div' }))
    },
    changeValue(index, value) {
      this.$set(this.undoList, index, { value, status: 'div' })
    },
  },
  mounted() {
    /**
     * { success: true, data: [ {status: 'div', value: '孙悟空' } ] }
     */
    axios
      .get('./getUndoList.json')
      .then((res) => {
        this.undoList = res.data
      })
      .catch((e) => {
        console.log(e)
      })
  },
}
</script>

<style lang="stylus" scoped></style>
