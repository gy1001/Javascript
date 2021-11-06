<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <my-authority :authority="['admin']">
      <SettingDrawer />
    </my-authority>

    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        :trigger="null"
        v-model="collapsed"
        collapsible
        :theme="navTheme"
        v-if="navLayout === 'left'"
        width="256"
      >
        <div class="logo">Ant design Vue</div>
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger-icon"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from './Header.vue'
import SiderMenu from './SiderMenu.vue'
import Footer from './Footer.vue'
import SettingDrawer from '../components/settingDrawer'
export default {
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer,
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark'
    },
    navLayout() {
      return this.$route.query.navLayout || 'left'
    },
  },
  data() {
    return {
      collapsed: false,
    }
  },
}
</script>

<style lang="less" scoped>
.trigger-icon {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
  &:hover {
    background-color: #eee;
  }
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark {
  /deep/ .logo {
    color: #fff;
  }
}
</style>
