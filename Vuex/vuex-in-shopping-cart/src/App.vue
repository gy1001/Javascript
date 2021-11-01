<template>
  <div id="app">
    <h1>购物车示例</h1>
    <p>账号: {{ email }}</p>
    <hr />
    <h2>产品</h2>
    <ProductList />
    <hr />
    <ShoppingCart />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'
export default {
  name: 'App',
  components: {
    ProductList,
    ShoppingCart
  },
  computed: mapState({
    email: state => state.userInfo.email
  })
}
</script>

<style></style>
