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
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    handlerSettingChange(type, value) {
      this.$router.push({
        query: {
          ...this.$router.query,
          [type]: value,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.setting-handle{
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background-color: #2f54eb;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
  color:#fff
}
</style>
