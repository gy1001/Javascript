<template>
  <div>
    <Header />
    <SiderMenu />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue';
import SiderMenu from './SiderMenu.vue';
import Footer from './Footer.vue';
export default {
  components: {
    Header,
    Footer,
    SiderMenu,
  },
};
</script>

<style lang="less" scoped></style>
