<template>
  <div id="cart">
    <p v-show="!products.length"><i>请添加产品到购物车</i></p>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }} x {{ product.quantity }}
      </li>
    </ul>
    <p>合计: {{ total }}</p>
    <button :disabled="!products.length" @click="submit(products)">提交</button>
    <p v-show="checkoutStatus">提交 {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    })
    // 相当于如下
    // ...mapGetters({
    //   products: 'cart/cartProducts',
    //   total: 'cart/cartTotalPrice'
    // })
  },
  methods: {
    ...mapActions('cart', ['submit'])
  }
}
</script>

<style lang="scss" scoped></style>
