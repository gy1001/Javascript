<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script>
import ZhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import EnUS from 'ant-design-vue/lib/locale-provider/en_US'
import moment from 'moment' // datepicker 依赖 moment
export default {
  computed: {
    currentLanguage() {
      return this.$store.state.languages
    },
  },
  data() {
    return {
      locale: ZhCN,
    }
  },

  watch: {
    '$store.state.languages': {
      handler: function (newVal) {
        const newLocale = newVal === 'EN' ? EnUS : ZhCN
        this.locale = newLocale
        moment.locale(newVal === 'EN' ? 'en-cn' : 'zh-cn')
      },
      deep: true,
    },
  },
}
</script>

<style lang="less"></style>
