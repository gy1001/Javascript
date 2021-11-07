<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      width="300px"
    >
      <template v-slot:handle>
        <div class="setting-handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <h2>整体风格定制</h2>
      <a-radio-group
        @change="(e) => handlerSettingChange('navTheme', e.target.value)"
        name="navTheme"
        :value="$route.query.navTheme || 'dark'"
      >
        <a-radio value="dark"> 黑色 </a-radio>
        <a-radio value="light"> 白色 </a-radio>
      </a-radio-group>
      <h2>导航模式</h2>
      <a-radio-group
        @change="(e) => handlerSettingChange('navLayout', e.target.value)"
        name="navLayout"
        :value="$route.query.navLayout || 'left'"
      >
        <a-radio value="left"> 左侧 </a-radio>
        <a-radio value="top"> 顶部 </a-radio>
      </a-radio-group>
      <h2>设置主题</h2>
      <a-radio-group
        @change="(e) => handlerThemeChange(e.target.value)"
        name="navLayout"
        default-value="#1890ff"
      >
        <a-radio value="#1890ff" style="color: #1890ff"> 蓝色 </a-radio>
        <a-radio value="green" style="color: green"> 绿色 </a-radio>
        <a-radio value="red" style="color: red"> 红色 </a-radio>
        <a-radio value="#333" style="color: #333"> 黑色 </a-radio>
        <a-radio value="purple" style="color: purple"> 紫色 </a-radio>
      </a-radio-group>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      navTheme: 'dark',
      navLayout: 'left',
    }
  },
  methods: {
    afterVisibleChange() {
      //console.log('visible', val)
    },
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    handlerSettingChange(type, value) {
      this.$router.push({
        query: {
          ...this.$router.query,
          [type]: value,
        },
      })
    },
    handlerThemeChange(themeColor) {
      window.less
        .modifyVars({
          '@primary-color': themeColor,
        })
        .then(() => {
          console.log('成功')
        })
        .catch((error) => {
          alert('失败')
          console.log(error)
        })
    },
  },
}
</script>
<style lang="less" src="./index.less"></style>
