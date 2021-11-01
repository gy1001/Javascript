<template>
  <ul>
    <li v-for="item in productList" :key="item.id">
      {{ item.title }} - {{ item.price }}
      <br />
      <button :disabled="!item.inventory" @click="addToCart(item)">
        加入购物车
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    productList: state => state.products.all
  }),
  created() {
    this.$store.dispatch('products/getAllProducts')
  },
  methods: {
    addToCart() {}
  }
}
</script>

<style lang="scss" scoped></style>
