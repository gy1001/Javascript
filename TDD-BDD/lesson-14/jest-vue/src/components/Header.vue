<template>
  <div class="hello">
    1111
    <input
      type="text"
      data-test="input"
      v-model="inputValue"
      @keyup.enter="handlerAdd"
    />
  </div>
</template>

<script>
export default {
  name: 'hello-world',
  props: {
    msg: String,
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    handlerAdd() {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.inputValue = ''
      }
    },
  },
}
</script>
