<template>
  <div class="undo-list">
    <div class="title">
      正在进行<span class="count" data-test="count">{{ list.length }}</span>
    </div>
    <ul class="list">
      <li
        class="item"
        data-test="item"
        v-for="(item, index) in list"
        :key="item"
      >
        {{ item }}
        <span
          class="delete-icon"
          data-test="delete"
          @click="handleDelete(index)"
          >X</span
        >
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
<style scoped lang="stylus">
.undo-list{
  width: 600px;
  margin: 0 auto;
  .title{
    line-height: 30px;
    font-size: 20px;
    font-weight: bold;
    .count{
      float: right;
      display: block;
      line-height: 20px;
      height: 20px;
      width: 20px;
      text-align: center;
      background-color: #e6e6e6;
      border-radius: 10px;
      color: #000;
    }
  }
  .list{
    list-style-type: none;
  }
  .item{
    margin-bottom: 10px;
    line-height: 42px;
    font-size: 14px;
    background-color: #fff;
    border-left: 5px solid #629a9a;
    border-radius: 3px;
    text-indent: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .delete-icon{
      height: 20px;
      width: 20px;
      line-height: 20px;
      text-indent: 0;
      text-align: center;
      background-color: #e6e6e6;
      border-radius: 10px;
      color: #000;
      margin-right: 10px;
    }
  }
}
</style>
