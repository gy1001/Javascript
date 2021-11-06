<template>
  <div>
    分析页面
    <Charts />
  </div>
</template>

<script>
import Charts from '../../components/Chart.vue'
//import axios from 'axios'
export default {
  components: { Charts },

  mounted() {
    this.getChartData()
  },

  methods: {
    getChartData() {},
  },
}
</script>

<style lang="less" scoped></style>
