<template>
  <div style="width: 256px">
    <a-menu
      mode="inline"
      :theme="theme"
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="handleRouter(item)"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}-{{ item.path }}</span>
        </a-menu-item>
        <sub-menu
          v-else
          :key="item.path"
          :menu-info="item"
          :handleRouter="handleRouter"
        />
      </template>
    </a-menu>
  </div>
</template>
<script>
import SubMenu from './SubMenu.vue'
import { check } from '../utils/auth'
export default {
  props: {
    theme: {
      type: String,
      default: 'dark',
    },
  },
  components: {
    'sub-menu': SubMenu,
  },
  watch: {
    '$route.path': {
      handler(newValue) {
        this.selectedKeys = this.selelctedKeysMap[newValue]
        this.openKeys = this.openKeysMap[newValue]
      },
    },
  },
  data() {
    return {
      openKeysMap: {},
      selelctedKeysMap: {},
      //selectedKeys: ['/dashboard/workplace'],
      selectedKeys: [],
      openKeys: [],
      //openKeys: ['/dashboard'],
      menuData: [],
    }
  },
  created() {
    this.menuData = this.getMenuData(this.$router.options.routes)
    const currentPath = this.$route.path
    this.openKeys = this.openKeysMap[currentPath]
    this.selectedKeys = this.selelctedKeysMap[currentPath]
  },
  methods: {
    getMenuData(routes, parentKey) {
      const menuData = []
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break
        }
        //routes.forEach((item) => {
        const newItem = { ...item }
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = [parentKey || item.path]
          this.selelctedKeysMap[item.path] = [item.path]
          if (item.children) {
            delete newItem.children
            newItem.children = this.getMenuData(
              item.children,
              parentKey || item.path
            )
          }
          menuData.push(newItem)
        } else if (
          item.children &&
          !item.hideInMenu &&
          !item.hideChildrenInMenu
        ) {
          // 首页没有 name
          menuData.push(...this.getMenuData(item.children))
        }
        //})
      }
      return menuData
    },

    handleRouter(item) {
      console.log(item)
    },
  },
}
</script>
