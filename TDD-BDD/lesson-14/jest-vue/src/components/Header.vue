<template>
  <div class="header">
    <div class="header-content">
      TodoList
      <input
        class="header-input"
        placeholder="请输入待办事项"
        type="text"
        data-test="input"
        :value="inputValue"
        @keyup.enter="handlerAdd"
        @input="(e) => changeInputValue(e.target.value)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'hello-world',
  props: {
    msg: String,
  },
  computed: {
    ...mapState({
      inputValue: (state) => state.inputValue,
    }),
  },
  methods: {
    handlerAdd() {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.changeInputValue('')
      }
    },
    ...mapMutations({
      changeInputValue: 'changeInputValue',
    }),
  },
}
</script>
<style scoped lang="stylus">
.header{
  background-color: #666;
  line-height: 60px;
  .header-content{
    width: 600px;
    margin: 0 auto;
    color: #fff;
    font-size: 24px;
    .header-input{
      float: right;
      width: 360px;
      margin-top :16px;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }
  }
}
</style>
