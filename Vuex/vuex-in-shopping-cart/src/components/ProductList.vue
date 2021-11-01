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
import { mapState, mapActions } from 'vuex'
export default {
  computed: mapState({
    productList: state => state.products.all
  }),
  created() {
    this.$store.dispatch('products/getAllProducts')
  },
  methods: {
    ...mapActions('cart', ['addToCart'])
  }
  // 相当于
  // methods: {
  //   addProductToCart(product){
  //     this.$store.dispatch('cart/addProductToCart', product)
  //   }
  // },
}
</script>

<style lang="scss" scoped></style>
